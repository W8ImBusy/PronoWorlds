import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Match } from "../models/match.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MatchsService{
    
    constructor(private http: HttpClient) {}

    getAllMatchs(): Observable<Match[]>{
        return this.http.get<Match[]>('http://localhost:3000/api/matchs');
    }


}