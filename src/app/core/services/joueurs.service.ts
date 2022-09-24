import { Injectable } from "@angular/core";
import { AngularFireDatabase} from '@angular/fire/compat/database'
import { Observable, map, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class JoueursService{
    
    constructor(private firebaseApi: AngularFireDatabase) {}

    createUser(email: string, nickname: string, user: any){
            this.firebaseApi.database.ref('users').child(user.uid).set({
            email:email,
            nickname:nickname,
            key : user.uid,
            position : 1,
            score: 0
        })
    }

    getAllUsers(): Observable<any>{
        return this.firebaseApi.list('users').valueChanges();
    }

    getAllSortedUsers() {
        return this.getAllUsers().pipe(
            map(users => [...users].sort((a, b) => b.score - a.score)),
            tap(users => users.forEach(user => this.firebaseApi.database.ref('users').child(user.key).update({position: users.indexOf(user)+1}))),
        )
    }

}