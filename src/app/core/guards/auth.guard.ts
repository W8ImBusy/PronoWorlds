import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    user!: any;
  constructor(private router: Router,
              private auth:AuthService) {
                this.auth.getCurrentUser().subscribe(
                 user => this.user = user
                )
              }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.user){
        return true;
    }else{
        this.router.navigateByUrl('/login');
        return false;
    }
  }
}