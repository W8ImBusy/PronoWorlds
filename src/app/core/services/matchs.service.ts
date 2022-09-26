import { Injectable } from "@angular/core";
import { Observable, map, filter, tap } from "rxjs";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { formatDate } from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class MatchsService{

    currentDate!: Date;
    constructor(private firebaseApi: AngularFireDatabase) {
        this.currentDate = new Date();
    }

    getMatchsOfTodayHelper(matchs : any[], date : Date): any[]{
        var matchsToday: any[] = [];
        matchs.forEach(match => {
            if (match.date == formatDate(date,'dd/MM', 'fr')) {
                matchsToday.push(match)
            }
        });
        return matchsToday;
    }

    getUpcomingMatchsHelper(matchs: any[], currentDate :Date): any[]{
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

    getAllMatchs(): Observable<any>{
        return this.firebaseApi.list('matchs').valueChanges();
    }

    getNumberOfMatchs(): Observable<number>{
        return this.getAllMatchs().pipe(
            map(matchs => matchs.length)
        )
    }

    getMatchByID(id : number): Observable<any> {
        return this.getAllMatchs().pipe(
            map(matchs => matchs[id-1])
        );
    }
    getMatchsOfToday(date: Date): Observable<any>{
        return this.getAllMatchs().pipe(
            map(matchs => this.getMatchsOfTodayHelper(matchs, date)),
        )
    }
    getUpcomingMatchs(date: Date): Observable<any>{
        return this.getAllMatchs().pipe(
            map(matchs => this.getUpcomingMatchsHelper(matchs, date))
        )
    }

    setPronosticOnMatch(idMatch: number, idUser: string, score: string, winner: string) {
        this.firebaseApi.database.ref('matchs').child(`${idMatch}`).child('pronostics').child(idUser).set({
            score: score,
            winner: winner
        })
    }


}