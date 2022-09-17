import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RankingPageComponent } from "./ranking-page/ranking-page.component";


const routes : Routes = [
    {path: 'ranking', component: RankingPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: '', component: LandingPageComponent}
    
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