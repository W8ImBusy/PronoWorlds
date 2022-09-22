import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database'
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class JoueursService{
    
    constructor(private firebaseApi: AngularFireDatabase) {}

    createUser(email: string, nickname: string, user: any){
        return this.firebaseApi.database.ref('users').child(user.uid).set({
            email:email,
            nickname:nickname,
            score: 0,
            position: 1
        })
    }

    getAllUsers(): Observable<any>{
        return this.firebaseApi.list('users').valueChanges();
    }
}