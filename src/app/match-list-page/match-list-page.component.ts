import { Component, OnInit } from '@angular/core';
import { Observable, from, take } from 'rxjs';
import { MatchsService } from '../core/services/matchs.service';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

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
  tomorrowDate!: Date;
  afterTomorrowDate!: Date;
  after2TomorrowDate!: Date;
  userId!: string;
  pronostiqued: any[] = [];

  constructor(private mService:MatchsService, private router:Router, private auth:AuthService) { }

  ngOnInit(): void {

    this.tomorrowDate = new Date();
    this.tomorrowDate.setDate(new Date().getDate()+1);

    this.afterTomorrowDate = new Date();
    this.afterTomorrowDate.setDate(new Date().getDate()+2);

    this.after2TomorrowDate = new Date();
    this.after2TomorrowDate.setDate(new Date().getDate()+3);

    this.currentMatchs$ = this.mService.getMatchsOfToday();
    this.tomorrowMatchs$ = this.mService.getMatchsOfDay(this.tomorrowDate);
    this.afterTomorrowMatchs$ = this.mService.getMatchsOfDay(this.afterTomorrowDate);
    this.after2TomorrowMatchs$ = this.mService.getMatchsOfDay(this.after2TomorrowDate);

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
