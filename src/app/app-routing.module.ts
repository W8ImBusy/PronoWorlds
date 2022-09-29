import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HistoriqueComponent } from "./historique/historique.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { ManageMatchsComponent } from "./manage-matchs/manage-matchs.component";
import { MatchListPageComponent } from "./match-list-page/match-list-page.component";
import { RankingPageComponent } from "./ranking-page/ranking-page.component";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { SingleMatchPageComponent } from "./single-match-page/single-match-page.component";


const routes : Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'ranking', component: RankingPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'matchs', component:MatchListPageComponent},
    {path: 'matchs/:id', component:SingleMatchPageComponent},
    {path: 'profil', component:HistoriqueComponent},
    {path: 'manage', component:ManageMatchsComponent},
    { path: '**', redirectTo: ''}
    
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule{}