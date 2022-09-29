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

  currentDate !: Date;
  joueurs$ !: any[];
  last5: any[][] = [[]];
  displayedColumns: string[] = ["Position", "Name", "Score", "Pronostics"];
  constructor(public jService : JoueursService, private mService:MatchsService) {}

  ngOnInit(): void {
    this.currentDate = new Date();
    this.jService.getAllSortedUsers().subscribe(
      joueurs => {
        this.joueurs$ = joueurs;
        var index = 0;
        joueurs.forEach(joueur => {
          this.mService.getLast5PronoResultsOfUser(joueur.id, this.currentDate).subscribe(
            result => {this.last5[index] = result
            console.log(this.last5);
            index += 1;
            })
          
        })
    }
  )
}
}
