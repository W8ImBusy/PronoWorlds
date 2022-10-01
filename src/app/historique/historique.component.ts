import { Component, OnInit } from '@angular/core';
import { MatchsService } from '../core/services/matchs.service';
import { Observable, take } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {

  userId!: string;
  adminId!: string;
  currentDate!: Date;
  endedMatchs$!: Observable<any>;
  pronos: any[] = [];
  constructor(private mService: MatchsService, private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.endedMatchs$ = this.mService.getEndedMatchs();
    this.auth.getCurrentUser().pipe(take(1)).subscribe(
      user => {
        this.userId = user.uid;
        this.mService.getAllEndedPronoResultsOfUser(this.userId).pipe(take(1)).subscribe(
          result => {this.pronos = result
          })
      }
    );
    this.adminId = environment.adminId;
  }
  
  onSetUpResult(matchId: number){
    this.router.navigateByUrl('/historique/'+`${matchId}`);
  }
}
