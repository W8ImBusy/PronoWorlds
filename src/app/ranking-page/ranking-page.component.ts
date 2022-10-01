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
  lasts8: any[] = [];
  displayedColumns: string[] = ["Position", "Name", "Score", "Pronostics"];
  constructor(public jService : JoueursService, private mService:MatchsService) {}

  ngOnInit(): void {
    this.jService.getAllSortedUsers().pipe(take(1)).subscribe(
      joueurs => {
        this.joueurs$ = joueurs;
        joueurs.slice().reverse().forEach(joueur => {
          this.mService.getLast8PronoResultsOfUser(joueur.id).pipe(take(1)).subscribe(
            result => {
              this.lasts8.push(result);
            })
        })
        console.log(this.lasts8)
    }
  )
}
}
