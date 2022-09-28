import { Injectable } from "@angular/core";
import { Observable, map, filter, tap, from, take } from "rxjs";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { formatDate } from "@angular/common";
import { JoueursService } from "./joueurs.service";

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

    constructor(private firebaseApi: AngularFireDatabase, private jService:JoueursService) {
        this.firebaseApi.database.ref('matchs').child("1").child('result').on('value', (snapshot) => {
            var ecart;
            var winner;
            var correct;
            var currentScore: number;
            this.jService.getUserById("WLIqLgwzajaLIctwrLkqRf2gV3I2").pipe(take(1)).subscribe(
                user => {
                    currentScore = user[4];
                    var ref = this.firebaseApi.database.ref('matchs').child("1").child('pronostics').child("WLIqLgwzajaLIctwrLkqRf2gV3I2");
                    this.getOnePronosticOfUser(1, "WLIqLgwzajaLIctwrLkqRf2gV3I2").pipe(take(1)).subscribe(
                    prono => {
                        ecart = prono[1];
                        winner = prono[3];
                        correct = prono[0];
                        console.log(winner != snapshot.val().winner)
                        switch (snapshot.val().stage){
                            case 'playin':{
                                if (winner == snapshot.val().winner && correct == 'wrong'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore+this.playinPts});
                                    ref.update({correct : 'good'});
                                }else if (winner != snapshot.val().winner && correct == 'good'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore-this.playinPts});
                                    ref.update({correct : 'wrong'});
                                }
                                break;
                            }
                            case 'knockout':{
                                if (winner == snapshot.val().winner && ecart == snapshot.val().ecart && correct == 'wrong'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore+(this.knockoutPts*2)});
                                    ref.update({correct : 'perfect'});
                                }else if (winner == snapshot.val().winner && correct == 'wrong'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore+(this.knockoutPts)});
                                    ref.update({correct : 'good'});
                                }else if (winner !== snapshot.val().winner && correct == 'perfect'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore-(this.knockoutPts*2)});
                                    ref.update({correct : 'wrong'});
                                }else if (winner == snapshot.val().winner && ecart != snapshot.val().ecart && correct == 'perfect'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore-(this.knockoutPts)});
                                    ref.update({correct : 'good'});
                                }else if (winner == snapshot.val().winner && ecart == snapshot.val().ecart && correct == 'good'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore+(this.knockoutPts)});
                                    ref.update({correct : 'perfect'});
                                }else if (winner == snapshot.val().winner && correct == 'good'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore-(this.knockoutPts)});
                                    ref.update({correct : 'wrong'});
                                }
                                break;
                            }
                            case 'group':{
                                if (winner == snapshot.val().winner && correct == 'wrong'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore+(this.groupPts)});
                                    ref.update({correct : 'good'});
                                }else if (winner != snapshot.val().winner && correct == 'good'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore-this.groupPts});
                                    ref.update({correct : 'wrong'});
                                }
                                break;
                            }
                            case 'quarter':{
                                if (winner == snapshot.val().winner && ecart == snapshot.val().ecart && correct == 'wrong'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore+(this.quaterPts*2)});
                                    ref.update({correct : 'perfect'});
                                }else if (winner == snapshot.val().winner && correct == 'wrong'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore+(this.quaterPts)});
                                    ref.update({correct : 'good'});
                                }else if (winner !== snapshot.val().winner && correct == 'perfect'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore-(this.quaterPts*2)});
                                    ref.update({correct : 'wrong'});
                                }else if (winner == snapshot.val().winner && ecart != snapshot.val().ecart && correct == 'perfect'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore-(this.quaterPts)});
                                    ref.update({correct : 'good'});
                                }else if (winner == snapshot.val().winner && ecart == snapshot.val().ecart && correct == 'good'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore+(this.quaterPts)});
                                    ref.update({correct : 'perfect'});
                                }else if (winner == snapshot.val().winner && correct == 'good'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore-(this.quaterPts)});
                                    ref.update({correct : 'wrong'});
                                }
                                break;
                            }
                            case 'semi':{
                                if (winner == snapshot.val().winner && ecart == snapshot.val().ecart && correct == 'wrong'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore+(this.semiPts*2)});
                                    ref.update({correct : 'perfect'});
                                }else if (winner == snapshot.val().winner && correct == 'wrong'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore+(this.semiPts)});
                                    ref.update({correct : 'good'});
                                }else if (winner !== snapshot.val().winner && correct == 'perfect'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore-(this.semiPts*2)});
                                    ref.update({correct : 'wrong'});
                                }else if (winner == snapshot.val().winner && ecart != snapshot.val().ecart && correct == 'perfect'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore-(this.semiPts)});
                                    ref.update({correct : 'good'});
                                }else if (winner == snapshot.val().winner && ecart == snapshot.val().ecart && correct == 'good'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore+(this.semiPts)});
                                    ref.update({correct : 'perfect'});
                                }else if (winner == snapshot.val().winner && correct == 'good'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore-(this.semiPts)});
                                    ref.update({correct : 'wrong'});
                                }
                                break;
                            }
                            case 'final':{
                                if (winner == snapshot.val().winner && ecart == snapshot.val().ecart && correct == 'wrong'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore+(this.finalPts*2)});
                                    ref.update({correct : 'perfect'});
                                }else if (winner == snapshot.val().winner && correct == 'wrong'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore+(this.finalPts)});
                                    ref.update({correct : 'good'});
                                }else if (winner !== snapshot.val().winner && correct == 'perfect'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore-(this.finalPts*2)});
                                    ref.update({correct : 'wrong'});
                                }else if (winner == snapshot.val().winner && ecart != snapshot.val().ecart && correct == 'perfect'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore-(this.finalPts)});
                                    ref.update({correct : 'good'});
                                }else if (winner == snapshot.val().winner && ecart == snapshot.val().ecart && correct == 'good'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore+(this.finalPts)});
                                    ref.update({correct : 'perfect'});
                                }else if (winner == snapshot.val().winner && correct == 'good'){
                                    this.firebaseApi.database.ref('users').child("WLIqLgwzajaLIctwrLkqRf2gV3I2").update({score : currentScore-(this.finalPts)});
                                    ref.update({correct : 'wrong'});
                                }
                                break;
                            }    
                        }
                    }
                )
            });
        })
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

    getMatchsOfWeekHelper(matchs: any[], currentDate :Date): any[]{
        var matchsUpcoming: any[] = [];
        matchs.forEach(match => {
            var currentDateFormated = formatDate(currentDate, 'dd/MM', 'fr');
            var upcomingDateFormated = match.date;
            var upcomingDay = +upcomingDateFormated.split('/',2)[0];
            var upcomingMonth = +upcomingDateFormated.split('/',2)[1];
            var currentDay = +currentDateFormated.split('/',2)[0];
            var currentMonth = +currentDateFormated.split('/',2)[1];
            if (((upcomingMonth = currentMonth) && (upcomingDay > currentDay)) || (upcomingMonth > currentMonth)) {
                matchsUpcoming.push(match);
            }
        });
        return matchsUpcoming;
    }

    getEndedMatchsHelper(matchs: any[], currentDate :Date): any[]{
        var pastMatchs: any[] = [];
        matchs.forEach(match => {
            var currentDateFormated = formatDate(currentDate, 'dd/MM', 'fr');
            var pastDateFormated = match.date;
            var pastDay = +pastDateFormated.split('/',2)[0];
            var pastMonth = +pastDateFormated.split('/',2)[1];
            var currentDay = +currentDateFormated.split('/',2)[0];
            var currentMonth = +currentDateFormated.split('/',2)[1];
            if (((pastMonth = currentMonth) && (pastDay < currentDay)) || (pastMonth < currentMonth)) {
                pastMatchs.push(match);
            }
        });
        return pastMatchs;
    }

    isPronostiquedMatchByUser(pronos : any[], userId: string): boolean{
        var pronostiqued : boolean = false;
        pronos.forEach(prono => {
            if (prono.userId === userId){
                pronostiqued = true;
            }
        });
        return pronostiqued;
    }

    getAllPronostiquedByUserHelper(matchs: any[], userId: string): boolean[]{
        var pronostiqued : boolean[] = [];
        matchs.forEach(match =>{
            this.getAllPronosticsOfMatch(match.id).pipe(take(1)).subscribe(
                pronos => pronostiqued.push(this.isPronostiquedMatchByUser(pronos, userId))
            )
        });
        return pronostiqued;
    }

    getAllMatchs(): Observable<any>{
        return this.firebaseApi.list('matchs').valueChanges();
    }

    getMatchByID(id : number): Observable<any> {
        return this.getAllMatchs().pipe(
            map(matchs => matchs[id-1])
        );
    }
    getMatchsOfDay(date: Date): Observable<any>{
        return this.getAllMatchs().pipe(
            map(matchs => this.getMatchsOfDayHelper(matchs, date))
        )
    }
     
    getMatchsOfWeek(date: Date):Observable<any>{
        return this.getAllMatchs().pipe(
            map(matchs => this.getMatchsOfWeekHelper(matchs, date))
        )
    }

    getEndedMatchs(date: Date):Observable<any>{
        return this.getAllMatchs().pipe(
            map(matchs => this.getEndedMatchsHelper(matchs, date))
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
    getLast5Matchs(date: Date): Observable<any>{
        return this.getEndedMatchs(date).pipe(
            map(matchs => this.getLast5MatchsHelper(matchs))
    )}

    getResultOfProno(pronos: any[], userId: string, winner: string, ecart: number, matchStage: string): string{
        var result = "null";
        if (this.isPronostiquedMatchByUser(pronos, userId)){
            pronos.forEach(prono => {
                if (prono.userId == userId){
                    result = prono.correct;
                }
            })
        }
        return result;
    }

    getLast5PronosHelper(matchs: any[], userId: string): string[]{
        var results: string[] = [];
        matchs.forEach(match => {
            this.getAllPronosticsOfMatch(match.id).pipe(take(1)).subscribe(
                pronos => results.push(this.getResultOfProno(pronos, userId, match.result.winner, match.result.ecart, match.result.stage)))
        })
        return results;  
    }



    getLast5Pronos(userId: string, date : Date): Observable<string[]>{
        return this.getLast5Matchs(date).pipe(
            map(matchs => this.getLast5PronosHelper(matchs, userId))
        )
    }
    getAllPronosticsOfMatch(matchId : number){
        return this.firebaseApi.list('matchs/'+`${matchId}`+"/pronostics").valueChanges();
    }

    getAllPronostiquedByUser(userId: string): Observable<boolean[]>{
        return this.getAllMatchs().pipe(
            map(matchs => this.getAllPronostiquedByUserHelper(matchs, userId))
        )
    }

    getOnePronosticOfUser(matchId: number, userId: string): Observable<any>{
        return this.firebaseApi.list('matchs/'+`${matchId}`+"/pronostics/"+userId).valueChanges();
    }
    setPronosticOnMatch(matchId: number, userId: string, ecart: number, winner: string) {
        this.firebaseApi.database.ref('matchs').child(`${matchId}`).child('pronostics').child(userId).set({
            ecart: ecart,
            winner: winner,
            userId : userId,
            correct : 'wrong'
        })
    }
}