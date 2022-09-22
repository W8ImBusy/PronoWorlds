import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  user!: any;
  signedIn!: boolean;

  constructor(private auth: AuthService) { 
  }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(user => {
      this.user = user;
      if (this.user) {
        this.signedIn = true;
      } else {
        this.signedIn = false;
      }
    });
  }

}
