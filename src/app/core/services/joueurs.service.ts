import { Injectable } from "@angular/core";
import { AngularFireDatabase} from '@angular/fire/compat/database'
import { Observable, map, tap } from "rxjs";
import { environment } from "src/environments/environment"; 

@Injectable({
    providedIn: 'root'
})
export class JoueursService{
    
    constructor(private firebaseApi: AngularFireDatabase) {}

    createUser(email: string, nickname: string, user: any){
            this.firebaseApi.list(`${environment.dbroot}`+'/users').valueChanges().subscribe(
                users => {
                    this.firebaseApi.database.ref(`${environment.dbroot}`).child('users').child(user.uid).set({
                        email:email,
                        nickname:nickname,
                        id : user.uid,
                        position : users.length,
                        score: 0
                }

            )
            
        })
    }

    getAllUsers(): Observable<any>{
        return this.firebaseApi.list(environment.dbroot+'/users').valueChanges();
    }

    getUserById(userId: string):Observable<any>{
        return this.firebaseApi.list(environment.dbroot+'/users/'+userId).valueChanges();
    }

    getAllSortedUsers() {
        return this.getAllUsers().pipe(
            map(users => [...users].sort((a, b) => b.score - a.score)),
            tap(users => {
                var index = 1;
                var sameRank = 1;
                users.forEach(user => {
                    if (users.indexOf(user) == 0){
                        this.firebaseApi.database.ref(environment.dbroot).child('users').child(user.id).update({position: index});
                    } else if (users.indexOf(user) >= 1){
                        var prec = users[users.indexOf(user)-1];
                        if (prec.score == user.score){
                            this.firebaseApi.database.ref(environment.dbroot).child('users').child(user.key).update({position: index});
                            sameRank += 1;
                        }else{
                            this.firebaseApi.database.ref(environment.dbroot).child('users').child(user.key).update({position: index + sameRank});
                            index += sameRank;
                            sameRank = 1;
                        }
                    }
                })            
            })
        )
    }

}