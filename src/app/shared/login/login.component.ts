import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  successMessage: string;

  constructor(public authService: AuthService, public fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  trylogin(value) {
    this.authService.doRegister(value).then(
      res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Your account has been created';
      },
      err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      }
    );
  }
}
