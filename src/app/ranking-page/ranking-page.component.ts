import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { JoueursService } from '../core/services/joueurs.service';

@Component({
  selector: 'app-ranking-page',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.scss']
})
export class RankingPageComponent implements OnInit {

  joueurs$ !: Observable<any>;
  displayedColumns: string[] = ["Position", "Name", "Score"];
  constructor(private jService : JoueursService) {}

  ngOnInit(): void {
    this.joueurs$ = this.jService.getAllUsers();
  }
}
