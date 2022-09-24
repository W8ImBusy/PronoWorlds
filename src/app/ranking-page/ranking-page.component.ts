import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map, take, tap } from 'rxjs';
import { JoueursService } from '../core/services/joueurs.service';

@Component({
  selector: 'app-ranking-page',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.scss']
})
export class RankingPageComponent implements OnInit {

  joueurs$ !: Observable<any>;
  displayedColumns: string[] = ["Position", "Name", "Score"];
  constructor(public jService : JoueursService) {}

  ngOnInit(): void {
    this.joueurs$ = this.jService.getAllSortedUsers().pipe(
      take(1)
    )
  }
}
