import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  emailClicked: boolean;

  constructor(public authService: AuthService, public fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
    this.emailClicked = false;
  }

  onSubmit() {
    this.trylogin(this.loginForm.value);
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  trylogin(value) {
    this.authService.doLogin(value).then(
      res => {
        this.errorMessage = '';
        this.successMessage = 'Your account has been created';
      },
      err => {
        this.errorMessage = err.message;
        this.successMessage = '';
      }
    );
  }

  onEmailClicked() {
    this.emailClicked = true;
  }
}
