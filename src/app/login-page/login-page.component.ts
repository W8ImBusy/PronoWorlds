import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  notify!: string;
  hide: boolean = true;

  constructor(private formBuilder: FormBuilder, private auth:AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  getEmailErrorMessage() {
    if (this.loginForm.controls['email'].errors?.['required']) {
      return 'Mets ton mail bouffon';
    }
    if (this.loginForm.controls['email'].errors?.['email']) {
      return 'C\'est pas un mail ça tocard';
    }
    return 'ok ca passe';
  }

  getPasswordErrorMessage() {
    if (this.loginForm.controls['password'].errors?.['required']) {
      return 'Je vole pas les mots de passe t\'inquiete, tu peux en mettre un';
    }
    if (this.loginForm.controls['password'].errors?.['minlength']) {
      return 'Mets au moins 6 caractères flemmard';
    }
    return 'ok ca passe';
  }

  login(): void {
    this.auth.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value);
  }

}
