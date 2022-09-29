import { Component, OnInit } from '@angular/core';
import { MatchsService } from '../core/services/matchs.service';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {

  userId!: string;
  currentDate!: Date;
  endedMatchs$!: Observable<any>;
  pronostiqued!: string[][];
  constructor(private mService: MatchsService, private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.endedMatchs$ = this.mService.getEndedMatchs();
    this.auth.getCurrentUser().subscribe(
      user => {
        this.userId = user.uid;
        this.mService.getAllPronoResultsOfUser(this.userId).subscribe(
          result => this.pronostiqued = result
        )
      }
    );
  }
  
  onSetUpResult(matchId: number){
    this.router.navigateByUrl('/historique/'+`${matchId}`);
  }
}
