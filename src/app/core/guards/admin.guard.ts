import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    user!: any;
  constructor(private router: Router,
              private auth:AuthService) {
                this.auth.getCurrentUser().subscribe(
                 user => this.user = user
                )
              }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.user?.uid == environment.adminId){
        return true;
    }else{
        this.router.navigateByUrl('/login');
        return false;
    }
  }
}