import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { MatchsService } from '../core/services/matchs.service';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-match-list-page',
  templateUrl: './match-list-page.component.html',
  styleUrls: ['./match-list-page.component.scss']
})
export class MatchListPageComponent implements OnInit {

  todayMatchs$!: Observable<any>;
  upcomingMatchs$!: Observable<any>;
  currentDate!: Date;
  userId!: string;
  pronostiqued!: boolean[];

  constructor(private mService:MatchsService, private router:Router, private auth:AuthService) { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.todayMatchs$ = this.mService.getMatchsOfToday(this.currentDate);
    this.upcomingMatchs$ = this.mService.getUpcomingMatchs(this.currentDate);
    this.auth.getCurrentUser().subscribe(
      user => {
        this.userId = user.uid;
        this.mService.getAllPronostiquedByUser(this.userId).subscribe(
          result => this.pronostiqued = result
        )
      }
    );
    
  }

  onPronostic(matchId:number){
    this.router.navigateByUrl(`matchs/${matchId}`);
  }
}
