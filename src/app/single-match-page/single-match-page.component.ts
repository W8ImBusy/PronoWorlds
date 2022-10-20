import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap, take } from 'rxjs';
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
  ecarts: string[] = [];
  teams!: string[];
  pronoForm!: FormGroup;
  user!: any;
  constructor(private aRoute: ActivatedRoute, private mService:MatchsService, private formBuilder: FormBuilder, private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.matchId = +this.aRoute.snapshot.params['id'];
    this.match$ = this.mService.getMatchByID(this.matchId).pipe(
      tap(match =>{
       if (match.result.stage == "k" || match.result.stage == "q" || match.result.stage == "s" || match.result.stage == "f"){
        this.ecarts = ["1", "2", "3"];
       }
       this.teams = [match.E1.nom,match.E2.nom];
      })
    );
    this.pronoForm = this.formBuilder.group({
      vainqueur: ['', Validators.required],
      ecart: ['', Validators.required]
    })
    this.auth.getCurrentUser().pipe(take(1)).subscribe(
      user => this.user = user
    )
  }
  
  onSetPronostic(){
    this.mService.setPronosticOnMatch(this.matchId, this.user.uid, this.pronoForm.controls['ecart'].value, this.pronoForm.controls['vainqueur'].value )
    this.router.navigateByUrl('matchs')
  }


}
