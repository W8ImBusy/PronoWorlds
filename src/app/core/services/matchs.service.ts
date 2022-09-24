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

    getMatchsOfADayHelper(matchs : any[], date : Date): any[]{
        var matchsToday: any[] = [];
        matchs.forEach(match => {
            if (match.date == formatDate(date,'dd/MM', 'fr')) {
                matchsToday.push(match)
            }
        });
        return matchsToday;

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
            map(matchs => matchs[id+1])
        );
    }
    getMatchsOfADay(date: Date): Observable<any>{
        return this.getAllMatchs().pipe(
            map(matchs => this.getMatchsOfADayHelper(matchs, date)),
        )
    }

    setPronosticOnMatch(idMatch: number, idUser: number, score: string, winner: string) {
        this.firebaseApi.database.ref('matchs').child(`${idMatch}`).child('pronostics').child(`${idUser}`).set({
            score: score,
            winner: winner
        })
    }


}