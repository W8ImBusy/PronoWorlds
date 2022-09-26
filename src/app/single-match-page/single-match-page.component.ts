import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { MatchsService } from '../core/services/matchs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-single-match-page',
  templateUrl: './single-match-page.component.html',
  styleUrls: ['./single-match-page.component.scss']
})
export class SingleMatchPageComponent implements OnInit {

  match$!: Observable<any>;
  matchId!: number;
  scores: string[] = [];
  teams!: string[];
  pronoForm!: FormGroup;
  user!: any;
  constructor(private aRoute: ActivatedRoute, private mService:MatchsService, private formBuilder: FormBuilder, private auth:AuthService ) { }

  ngOnInit(): void {
    this.matchId = +this.aRoute.snapshot.params['id'];
    this.match$ = this.mService.getMatchByID(this.matchId).pipe(
      tap(match =>{
       if (match.type == "BO5"){
        this.scores = ["1", "2", "3"];
       }
       this.teams = [match.E1,match.E2];
      })
    );
    this.pronoForm = this.formBuilder.group({
      vainqueur: ['', Validators.required],
      score: ['']
    })
    this.auth.getCurrentUser().subscribe(
      user => this.user = user
    )
  }
  
  onSetPronostic(){
    this.mService.setPronosticOnMatch(this.matchId, this.user.uid, this.pronoForm.controls['score'].value, this.pronoForm.controls['vainqueur'].value )
  }

}
