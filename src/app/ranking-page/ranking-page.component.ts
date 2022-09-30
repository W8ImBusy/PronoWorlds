import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map, take, tap } from 'rxjs';
import { JoueursService } from '../core/services/joueurs.service';
import { MatchsService } from '../core/services/matchs.service';

@Component({
  selector: 'app-ranking-page',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.scss']
})
export class RankingPageComponent implements OnInit {

  joueurs$ !: any[];
  lasts5: any[] = [];
  displayedColumns: string[] = ["Position", "Name", "Score", "Pronostics"];
  constructor(public jService : JoueursService, private mService:MatchsService) {}

  ngOnInit(): void {
    this.jService.getAllSortedUsers().pipe(take(1)).subscribe(
      joueurs => {
        this.joueurs$ = joueurs;
        var index = 0;
        joueurs.slice().reverse().forEach(joueur => {
          this.mService.getLast5PronoResultsOfUser(joueur.id).pipe(take(1)).subscribe(
            result => {
              this.lasts5[index] = result;
              index += 1;
            })
        })
    }
  )
}
}
