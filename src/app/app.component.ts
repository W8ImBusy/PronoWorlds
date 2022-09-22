import { Component} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'pronoworlds';

  signedIn : boolean = false;

  constructor(public fireauth:AngularFireAuth, public auth:AuthService) {
    this.fireauth.onAuthStateChanged( (user) => {
      if (user) {
        this.signedIn = true;
      } else {
        this.signedIn = false;
      }
    });
  }
}
