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
import { AuthGuard } from "./core/guards/auth.guard";
import { AdminGuard } from "./core/guards/admin.guard";
import { SetResultComponent } from "./set-result/set-result.component";


const routes : Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'ranking', component: RankingPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'matchs', component:MatchListPageComponent},
    {path: 'matchs/:id', component:SingleMatchPageComponent, canActivate : [AuthGuard]},
    {path: 'historique', component:HistoriqueComponent},
    {path: 'historique/:id', component:SetResultComponent, canActivate : [AdminGuard]},
    {path: 'manage', component:ManageMatchsComponent, canActivate : [AdminGuard]},
    {path: '**', redirectTo: ''}
    
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