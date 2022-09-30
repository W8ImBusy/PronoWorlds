import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { JoueursService } from '../core/services/joueurs.service';
import { MatchsService } from '../core/services/matchs.service';
import { pipe, take } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  user!: any;
  signedIn!: boolean;

  constructor(private auth: AuthService, public mService: MatchsService, public jService: JoueursService) { 
  }

  ngOnInit(): void {
    this.auth.getCurrentUser().pipe(take(1)).subscribe(user => {
      this.user = user;
      if (this.user) {
        this.signedIn = true;
      } else {
        this.signedIn = false;
      }
    });
  }

}
