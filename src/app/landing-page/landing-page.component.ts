import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Joueur } from '../core/models/joueur.model';
import { JoueursService } from '../core/services/joueurs.service';
import { map } from 'rxjs';
import { take } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private jService: JoueursService) { }

  joueur$!: Observable<Joueur>;
  ngOnInit(): void {
    this.joueur$ = this.jService.getJoueurById(1);
  }

}
