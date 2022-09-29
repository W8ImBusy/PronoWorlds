import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { MatchsService } from '../core/services/matchs.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-set-result',
  templateUrl: './set-result.component.html',
  styleUrls: ['./set-result.component.scss']
})
export class SetResultComponent implements OnInit {
  match$!: Observable<any>;
  userId !: string;
  matchForm!: FormGroup;
  matchId !: number;
  ecarts: string[] = [];
  teams!: string[];
  constructor(private auth:AuthService, private mService:MatchsService, private formBuilder : FormBuilder, private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.matchId = +this.aRoute.snapshot.params['id'];
    this.matchForm = this.formBuilder.group({
      'winner' : ['', Validators.required],
      'ecart' : ['', Validators.required]
    });
    this.match$ = this.mService.getMatchByID(this.matchId).pipe(
      tap(match =>{
       if (match.result.stage == ("knockout"||"quarter"||"semi"||"final")){
        this.ecarts = ["1", "2", "3"];
       }
       this.teams = [match.E1.nom,match.E2.nom];
      })
    );

    this.auth.getCurrentUser().subscribe(
      user => {
        this.userId = user.uid;
      }
    );
  }

  onSetUpResult(){
    this.mService.updateScore(this.matchForm.controls['winner'].value, this.matchForm.controls['ecart'].value, this.matchId)
  }
}
