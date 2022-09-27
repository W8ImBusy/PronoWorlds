import { Injectable } from "@angular/core";
import { Observable, map, filter, tap, from, take } from "rxjs";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { formatDate } from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class MatchsService{

    constructor(private firebaseApi: AngularFireDatabase) {
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

    getResultOfProno(pronos: any[], userId: string, winner: string, score: string, matchType: string): string{
        var result = "null";
        if (this.isPronostiquedMatchByUser(pronos, userId)){
            pronos.forEach(prono => {
                if (prono.userId == userId){
                    if (matchType == "BO5"){
                        if (prono.winner == winner && prono.score == score){
                            result = "perfect";
                        }else if (prono.winner == winner &&  prono.score != score){
                            result = "good";
                        }else{
                            result = "wrong";
                        }
                    }else{
                        if (prono.winner == winner){
                            result = "good";
                        }else{
                            result = "wrong";
                        }

                    }
                }
            })
        }
        return result;
    }

    getLast5PronosHelper(matchs: any[], userId: string): string[]{
        var results: string[] = [];
        matchs.forEach(match => {
            this.getAllPronosticsOfMatch(match.id).pipe(take(1)).subscribe(
                pronos => results.push(this.getResultOfProno(pronos, userId, match.winner, match.score, match.type)))
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

    setPronosticOnMatch(idMatch: number, idUser: string, score: string, winner: string) {
        this.firebaseApi.database.ref('matchs').child(`${idMatch}`).child('pronostics').child(idUser).set({
            score: score,
            winner: winner,
            userId : idUser
        })
    }



}