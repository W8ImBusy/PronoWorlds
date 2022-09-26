import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatchsService } from '../core/services/matchs.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match-list-page',
  templateUrl: './match-list-page.component.html',
  styleUrls: ['./match-list-page.component.scss']
})
export class MatchListPageComponent implements OnInit {

  todayMatchs$!: Observable<any>;
  upcomingMatchs$!: Observable<any>;
  currentDate!: Date;

  constructor(private mService:MatchsService, private router:Router) { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.todayMatchs$ = this.mService.getMatchsOfToday(this.currentDate);
    this.upcomingMatchs$ = this.mService.getUpcomingMatchs(this.currentDate);
  }

  onPronostic(id:number){
    this.router.navigateByUrl(`/matchs/${id}`)
  }
}
