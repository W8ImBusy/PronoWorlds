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
            map(matchs => this.getMatchsOfDayHelper(matchs, date)),
        )
    }
     
    getMatchsOfWeek(date: Date):Observable<any>{
        return this.getAllMatchs().pipe(
            map(matchs => this.getMatchsOfWeekHelper(matchs, date))
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