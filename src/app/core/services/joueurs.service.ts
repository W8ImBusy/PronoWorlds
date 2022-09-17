import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Joueur } from "../models/joueur.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class JoueursService{
    
    constructor(private http: HttpClient) {}

    getAllJoueurs(): Observable<Joueur[]>{
        return this.http.get<Joueur[]>('http://localhost:3000/api/joueurs');
    }

    getJoueurById(id: number): Observable<Joueur> {
        return this.http.get<Joueur>(`http://localhost:3000/api/joueurs/${id}`);
    }


}