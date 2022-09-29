import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppRoutingModule } from './app-routing.module';
import { RankingPageComponent } from './ranking-page/ranking-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { MatchListPageComponent } from './match-list-page/match-list-page.component';
import { SingleMatchPageComponent } from './single-match-page/single-match-page.component';
import { HistoriqueComponent } from './historique/historique.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ManageMatchsComponent } from './manage-matchs/manage-matchs.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    RankingPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    MatchListPageComponent,
    SingleMatchPageComponent,
    HistoriqueComponent,
    ManageMatchsComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR'}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
