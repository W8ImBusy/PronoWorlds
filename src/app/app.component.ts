import { Component} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'pronoworlds';
  color: string = "primary";
  signedIn : boolean = false;
  user!: any;
  adminId = environment.adminId;

  constructor(public fireauth:AngularFireAuth, public auth:AuthService) {
    this.fireauth.onAuthStateChanged( (user) => {
      if (user) {
        this.user = user
        this.signedIn = true;
        if (user.uid == environment.adminId){
          this.color = "warn";
        }
      } else {
        this.signedIn = false;
        this.user = null;
        this.color = "primary"
      }
    });
  }
}
