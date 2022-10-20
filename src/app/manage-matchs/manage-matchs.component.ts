import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatchsService } from '../core/services/matchs.service';

@Component({
  selector: 'app-manage-matchs',
  templateUrl: './manage-matchs.component.html',
  styleUrls: ['./manage-matchs.component.scss']
})
export class ManageMatchsComponent implements OnInit {

  matchForm!: FormGroup;
  noms: string[] = ['EDG','T1','FNC','C9','DWG','EG','G2','JDG','TES','RGE','DRX','GAM','GEN.G','RNG','100T','CTBC'];
  regions: string[] = ['Europe', 'Taïwan','Amérique du Nord', 'Vietnam', 'Corée', 'Chine'];
  stages: string[] = ['p','k','g','q','s','f'];
  currentDay = environment.currentDay;
  constructor(private formBuilder : FormBuilder, private mService : MatchsService, private router:Router) { }

  ngOnInit(): void {
    this.matchForm = this.formBuilder.group({
      'nom1' : ['', Validators.required],
      'region1' : ['', Validators.required],
      'nom2' : ['', Validators.required],
      'region2' : ['', Validators.required],
      'stage' : ['', Validators.required],
      'date' : ['', Validators.required],
      'heure' : ['', Validators.required],
      'day': ['', Validators.required]
    })
  }

  onCreateMatch(){
    this.mService.createMatch(this.matchForm.controls['nom1'].value,
    this.matchForm.controls['region1'].value,
    this.matchForm.controls['nom2'].value,
    this.matchForm.controls['region2'].value,
    this.matchForm.controls['stage'].value,
    this.matchForm.controls['date'].value,
    this.matchForm.controls['heure'].value,
    this.matchForm.controls['day'].value);
    this.router.navigateByUrl('/matchs');
  }

  onChangeDay(){
    this.mService.changeDay();
    this.router.navigateByUrl('/matchs');
  }
}
