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

  matchs$!: Observable<any>;
  currentDate!: Date;
  dateModif!: string;

  constructor(private mService:MatchsService, private router:Router) { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.matchs$ = this.mService.getMatchsOfADay(this.currentDate);
    this.dateModif = this.currentDate.getDate() + '/0' + `${this.currentDate.getMonth()+1}`;
    this.dateModif = formatDate(new Date(),'dd/MM', 'fr');
  }

  onPronostic(id:number){
    this.router.navigateByUrl(`/matchs/${id}`)
  }
}
