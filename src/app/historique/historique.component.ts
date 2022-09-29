import { Component, OnInit } from '@angular/core';
import { MatchsService } from '../core/services/matchs.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {

  currentDate!: Date;
  endedMatchs$!: Observable<any>;
  constructor(private mService: MatchsService) { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.endedMatchs$ = this.mService.getEndedMatchs();
  }
}
