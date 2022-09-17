import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Joueur } from '../core/models/joueur.model';
import { JoueursService } from '../core/services/joueurs.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-ranking-page',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.scss']
})
export class RankingPageComponent implements OnInit {

  joueurs$ !: Observable<Joueur[]>;
  displayedColumns: string[] = ["Position", "Name", "Score"];
  constructor(private jService : JoueursService) {}

  
  ngOnInit(): void {
    this.joueurs$ = this.jService.getAllJoueurs().pipe(
      tap(value => console.log(value))
    );

  }
}
