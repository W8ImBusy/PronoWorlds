import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchsService } from '../core/services/matchs.service';

@Component({
  selector: 'app-single-match-page',
  templateUrl: './single-match-page.component.html',
  styleUrls: ['./single-match-page.component.scss']
})
export class SingleMatchPageComponent implements OnInit {

  match!: any;
  constructor(private aRoute: ActivatedRoute, private mService:MatchsService) { }

  ngOnInit(): void {
    const matchId = +this.aRoute.snapshot.params['id'];
    this.match = this.mService.getMatchByID(matchId);
  }

}
