import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  successMessage: string;

  pinVerified: boolean;

  constructor(
    public authService: AuthService,
    public users: UsersService,
    public fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this.trylogin(this.loginForm.value).then((res: firebase.auth.UserCredential) => this.navigateToNextPage(res));
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  navigateToNextPage(res: firebase.auth.UserCredential) {
    this.users
      .getUsers('uid', res.user.uid)
      .pipe(take(1))
      .subscribe(users => {
        this.pinVerified = users[0].pinVerified;
        this.errorMessage = '';
        this.successMessage = 'You have successfully logged in';
        if (this.pinVerified) {
          const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/home';
          this.router.navigateByUrl(redirect);
        } else {
          this.router.navigate(['/verify-pin']);
        }
      });
  }

  trylogin(value) {
    return this.authService.doLogin(value).then(
      (res: firebase.auth.UserCredential) => {
        this.errorMessage = '';
        this.successMessage = 'You have successfully logged in';
        return res;
      },
      err => {
        this.errorMessage = err.message;
        this.successMessage = '';
      }
    );
  }
}
