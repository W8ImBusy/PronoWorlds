import { Component, OnInit } from '@angular/core';
import { Observable, from, take } from 'rxjs';
import { MatchsService } from '../core/services/matchs.service';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-match-list-page',
  templateUrl: './match-list-page.component.html',
  styleUrls: ['./match-list-page.component.scss']
})
export class MatchListPageComponent implements OnInit {

  currentMatchs$!: Observable<any>;
  tomorrowMatchs$!: Observable<any>;
  afterTomorrowMatchs$!: Observable<any>;
  after2TomorrowMatchs$!: Observable<any>;
  userId!: string;
  pronostiqued: any[] = [];

  constructor(private mService:MatchsService, private router:Router, private auth:AuthService) { }

  ngOnInit(): void {

    this.currentMatchs$ = this.mService.getMatchsOfDayG(environment.currentDay);
    this.tomorrowMatchs$ = this.mService.getMatchsOfDayG(environment.currentDay+ 1);

    this.auth.getCurrentUser().pipe(take(1)).pipe(take(1)).subscribe(
      user => {
        this.userId = user?.uid;
        this.mService.getAllPronoResultsOfUser(this.userId).pipe(take(1)).subscribe(
          result => {
            this.pronostiqued = result
         })
      }
    );
    
  }

  onPronostic(matchId:number){
    this.router.navigateByUrl(`matchs/${matchId}`);
  }
}
