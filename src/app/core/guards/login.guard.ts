import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    user!: any;
  constructor(private router: Router,
              private auth:AuthService) {
                this.auth.getCurrentUser().subscribe(
                 user => {
                    this.user = user
                    console.log(user)
                 }
                )
              }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.user == null){
        return true;
    }else{
        this.router.navigateByUrl('');
        return false;
    }
  }
}