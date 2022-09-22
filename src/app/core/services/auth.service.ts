import { Injectable } from "@angular/core";
import { AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from "@angular/router";
import { JoueursService } from "./joueurs.service";
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private fireauth: AngularFireAuth, private router : Router, private jService:JoueursService) {}

    //login method
    login(email: string, password :string){
        this.fireauth.signInWithEmailAndPassword(email, password).then ( (result) => {
            localStorage.setItem('token', 'true');
            this.router.navigateByUrl('');
        }, err => {
            alert('Something went wrong');
            this.router.navigateByUrl('/login');   
        })
    }

    //register method
    register(email: string, password :string, displayName: string){
        this.fireauth.createUserWithEmailAndPassword(email, password).then ( (result) => {
            result.user?.updateProfile({
                displayName : displayName,
            })
            this.jService.createUser(email, displayName, result.user);
            this.router.navigateByUrl('/login');
        }, err => {
            alert(err.message);
            this.router.navigateByUrl('register');   
        })
    }

    //sign out
    logout(): void {
        this.fireauth.signOut().then( () => {
            localStorage.removeItem('token');
            this.router.navigateByUrl('');
        }, err => {
            alert(err.message);
        })
        
    }
    getCurrentUser(){
        return this.fireauth.authState;
    }

}
    