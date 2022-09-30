import { Injectable } from "@angular/core";
import { Observable, map, filter, tap, from, take } from "rxjs";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { formatDate } from "@angular/common";
import { JoueursService } from "./joueurs.service";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class MatchsService{

    playinPts : number = 2;
    knockoutPts : number = 10;
    groupPts : number = 5;
    quaterPts : number = 30;
    semiPts : number = 45;
    finalPts : number = 60;
    userId!: any;
    

    constructor(private firebaseApi: AngularFireDatabase, private jService:JoueursService, private auth:AuthService) {
        this.auth.getCurrentUser().subscribe(user => {
            if (user){
                this.userId = user.uid;
            }else{
                this.userId = '';
            }
        })
    }

    updateScore(winner: string, ecart : number , matchId : number){
        this.firebaseApi.database.ref(environment.dbroot).child('matchs').child(`${matchId}`).child('result').on('value', (snapshot) => {
            this.getAllPronosticsOfMatch(matchId).pipe(take(1)).subscribe(pronos => {
                pronos.forEach(prono => {
                    var ecart;
                    var winner;
                    var correct;
                    var currentScore: number;
                    this.jService.getUserById(prono.userId).pipe(take(1)).subscribe(
                        user => {
                            currentScore = user[4];
                            ecart = prono.ecart;
                            winner = prono.winner;
                            correct = prono.correct;
                            switch (snapshot.val().stage){
                                case 'p':{
                                    this.setScoreforBO1(winner, snapshot.val().winner, correct, currentScore, matchId, prono.userId ,this.playinPts);
                                    break;
                                }
                                case 'k':{
                                    this.setScoreforBO5(winner, snapshot.val().winner, correct, ecart, snapshot.val().ecart, currentScore, matchId ,prono.userId ,this.knockoutPts);
                                    break;
                                }
                                case 'g':{
                                    this.setScoreforBO1(winner, snapshot.val().winner, correct, currentScore, matchId, prono.userId ,this.groupPts);
                                    break;
                                }
                                case 'q':{
                                    this.setScoreforBO5(winner, snapshot.val().winner, correct, ecart, snapshot.val().ecart, currentScore, matchId, prono.userId ,this.quaterPts);
                                    break;
                                }
                                case 's':{
                                    this.setScoreforBO5(winner, snapshot.val().winner, correct, ecart, snapshot.val().ecart, currentScore, matchId, prono.userId ,this.semiPts);
                                    break;
                                }
                                case 'f':{
                                    this.setScoreforBO5(winner, snapshot.val().winner, correct, ecart, snapshot.val().ecart, currentScore, matchId, prono.userId ,this.finalPts);
                                    break;
                                }    
                            }
                        }
                    );
                })
            })
        })
        this.firebaseApi.database.ref(environment.dbroot).child('/matchs').child(`${matchId}`).child('result').update({ecart : ecart, winner : winner});
    }

    createMatch(nom1 : string, region1 : string, nom2 : string, region2 : string, stage : string, date : string, heure : number){
        this.getNumberOfMatchs().pipe(take(1)).subscribe(
            length => {
                this.firebaseApi.database.ref(environment.dbroot).child('matchs').child(`${length+1}`).set({
                    E1 : {nom : nom1, region : region1},
                    E2 : {nom : nom2, region : region2},
                    id : length+1,
                    date : date,
                    heure : heure,
                    result : {stage : stage, ecart : 0, winner : ""}
                })
            }
        )
    }

    getAllMatchs(): Observable<any>{
        return this.firebaseApi.list(environment.dbroot+'/matchs').valueChanges();
    }

    getNumberOfMatchs():Observable<number>{
        return this.getAllMatchs().pipe(
            map(matchs => matchs.length)
        )
    }

    getMatchByID(id : number): Observable<any> {
        return this.getAllMatchs().pipe(
            map(matchs => matchs[id-1])
        );
    }

    getMatchsOfTodayHelper(matchs: any[]): any[]{
        var todayMatchs: any[] = [];
        var today = new Date();
        matchs.forEach(match => {
            if(match.date == formatDate(today,'dd/MM','fr') && match.heure > today.getHours()){
                todayMatchs.push(match)
            }
        });
        return todayMatchs;
    }
    
    getMatchsOfToday(): Observable<any>{
        return this.getAllMatchs().pipe(
            map(matchs => this.getMatchsOfTodayHelper(matchs))
        )
    }

    getMatchsOfDayHelper(matchs : any[], date : Date): any[]{
        var matchsDay: any[] = [];
        matchs.forEach(match => {
            if (match.date == formatDate(date,'dd/MM', 'fr')) {
                matchsDay.push(match)
            }
        });
        return matchsDay;
    }

    getMatchsOfDay(date: Date): Observable<any>{
        return this.getAllMatchs().pipe(
            map(matchs => this.getMatchsOfDayHelper(matchs, date))
        )
    }

    getMatchsOfWeekHelper(matchs: any[], currentDate :Date): any[]{
        var matchsUpcoming: any[] = [];
        matchs.forEach(match => {
            var currentDateFormated = formatDate(currentDate, 'dd/MM', 'fr');
            var upcomingDateFormated = match.date;
            var upcomingDay = +upcomingDateFormated.split('/',2)[0];
            var upcomingMonth = +upcomingDateFormated.split('/',2)[1];
            var currentDay = +currentDateFormated.split('/',2)[0];
            var currentMonth = +currentDateFormated.split('/',2)[1];
            console.log(upcomingDay)
            console.log(currentDay )
            console.log(upcomingMonth)
            console.log(currentMonth)
            if (((upcomingMonth == currentMonth) && (upcomingDay > currentDay)) || (upcomingMonth > currentMonth)) {
                matchsUpcoming.push(match);
            }
        });
        return matchsUpcoming;
    }

    getMatchsOfWeek(date: Date):Observable<any>{
        return this.getAllMatchs().pipe(
            map(matchs => this.getMatchsOfWeekHelper(matchs, date))
        )
    }

    getEndedMatchsHelper(matchs: any[]): any[]{
        var pastMatchs: any[] = [];
        var currentDate = new Date();
        var currentDateFormated = formatDate(currentDate, 'dd/MM', 'fr');
        var currentDay = +currentDateFormated.split('/',2)[0];
        var currentMonth = +currentDateFormated.split('/',2)[1];
        matchs.forEach(match => {
            var pastDateFormated = match.date;
            var pastDay = +pastDateFormated.split('/',2)[0];
            var pastMonth = +pastDateFormated.split('/',2)[1];
            if (((match.result.winner != "") || (this.userId == environment.adminId)) && (((pastMonth == currentMonth) && (pastDay < currentDay)) || ((pastMonth == currentMonth) && (pastDay == currentDay) && (match.heure <= currentDate.getHours())) || (pastMonth < currentMonth))) {
                pastMatchs.push(match);
            }
        });
        return pastMatchs;
    }

    getEndedMatchs():Observable<any>{
        return this.getAllMatchs().pipe(
            map(matchs => this.getEndedMatchsHelper(matchs))
        )
    }

    getLast5MatchsHelper(matchs : any[]): any[]{
        var results: any[];
        switch(matchs.length) {
            case 0:{
                results = [];
                break;
            }
            case 1:{
                results = [matchs[0]];
                break;
            }
            case 2:{
                results = [matchs[0], matchs[1]];
                break;
            }
            case 3:{
                results = [matchs[0], matchs[1], matchs[2]];
                break;
            }
            case 4:{
                results = [matchs[0], matchs[1], matchs[2], matchs[3]];
                break;
            }
            default:{
                results = [matchs[matchs.length-4],matchs[matchs.length-3],matchs[matchs.length-2],matchs[matchs.length-1],matchs[matchs.length]];
                break;
            }
        }
        return results;
        
    }

    getLast5Matchs(): Observable<any>{
        return this.getEndedMatchs().pipe(
            map(matchs => this.getLast5MatchsHelper(matchs))
    )}

    getLast5PronoResultsOfUser(userId: string): Observable<any[]>{
        return this.getLast5Matchs().pipe(
            map(matchs => this.getAllPronoResultsOfUserHelper(matchs, userId))
        )
    }

    getResultOfOneProno(pronos: any[], userId: string): string[]{
        var result :string[] = [];
        pronos.forEach(prono => {
            if (prono.userId == userId){
                result = prono;
            }
        })
        return result;
    }

    getAllPronosticsOfMatch(matchId : number): Observable<any[]>{
        return this.firebaseApi.list(environment.dbroot+'/matchs/'+`${matchId}`+"/pronostics").valueChanges();
    }

    getAllPronoResultsOfUserHelper(matchs: any[], userId: string): any[]{
        var pronostiqued : any[] = [];
        matchs.forEach(match =>{
            this.getAllPronosticsOfMatch(match.id).pipe(take(1)).subscribe(
                pronos => pronostiqued.push(this.getResultOfOneProno(pronos, userId))
            )
        });
        return pronostiqued;
    }

    getAllPronoResultsOfUser(userId: string): Observable<any[]>{
        return this.getAllMatchs().pipe(
            map(matchs => this.getAllPronoResultsOfUserHelper(matchs, userId))
        )
    }

    getOnePronosticOfUser(matchId: number, userId: string): Observable<any>{
        return this.firebaseApi.list(environment.dbroot+'/matchs/'+`${matchId}`+"/pronostics/"+userId).valueChanges();
    }
    setPronosticOnMatch(matchId: number, userId: string, ecart: number, winner: string) {
        this.firebaseApi.database.ref(environment.dbroot).child('matchs').child(`${matchId}`).child('pronostics').child(userId).set({
            ecart: ecart,
            winner: winner,
            userId : userId,
            correct : 'wrong'
        })
    }

    setScoreforBO1(winnerProno: string, winnerExa: string, correct: string, currentScore: number, matchId: number, userId: string, stagePts: number){
        var ref = this.firebaseApi.database.ref(environment.dbroot).child('matchs').child(`${matchId}`).child('pronostics').child(userId);
        if (winnerProno == winnerExa && correct == 'wrong'){
            this.firebaseApi.database.ref(environment.dbroot).child('users').child(userId).update({score : currentScore+stagePts});
            ref.update({correct : 'good'});
        }else if (winnerProno != winnerExa && correct == 'good'){
            this.firebaseApi.database.ref(environment.dbroot).child('users').child(userId).update({score : currentScore-stagePts});
            ref.update({correct : 'wrong'});
        }
    }

    setScoreforBO5(winnerProno: string, winnerExa: string, correct: string, ecart:number, ecartExa: number, currentScore: number, matchId: number, userId: string, stagePts: number){
        var ref = this.firebaseApi.database.ref(`${environment.dbroot}`).child('matchs').child(`${matchId}`).child('pronostics').child(userId);
        if (winnerProno == winnerExa && ecart == ecartExa && correct == 'wrong'){
            console.log('1')
            this.firebaseApi.database.ref(environment.dbroot).child('users').child(userId).update({score : currentScore+(stagePts*2)});
            ref.update({correct : 'perfect'});
        }else if (winnerProno == winnerExa && correct == 'wrong'){
            console.log('2')
            this.firebaseApi.database.ref(environment.dbroot).child('users').child(userId).update({score : currentScore+(stagePts)});
            ref.update({correct : 'good'});
        }else if (winnerProno !== winnerExa && correct == 'perfect'){
            console.log('3')
            this.firebaseApi.database.ref(environment.dbroot).child('users').child(userId).update({score : currentScore-(stagePts*2)});
            ref.update({correct : 'wrong'});
        }else if (winnerProno == winnerExa && ecart != ecartExa && correct == 'perfect'){
            console.log('4')
            this.firebaseApi.database.ref(environment.dbroot).child('users').child(userId).update({score : currentScore-(stagePts)});
            ref.update({correct : 'good'});
        }else if (winnerProno == winnerExa && ecart == ecartExa && correct == 'good'){
            console.log('5')
            this.firebaseApi.database.ref(environment.dbroot).child('users').child(userId).update({score : currentScore+(stagePts)});
            ref.update({correct : 'perfect'});
        }else if (winnerProno == winnerExa && correct == 'good'){
            console.log('6')
            this.firebaseApi.database.ref(environment.dbroot).child('users').child(userId).update({score : currentScore-(stagePts)});
            ref.update({correct : 'wrong'});
        }
        console.log('1')
    }
}