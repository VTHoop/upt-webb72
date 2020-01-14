import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  // emailClicked: boolean;

  pinVerified: boolean;

  constructor(
    public authService: AuthService,
    public users: UsersService,
    public fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
    // this.emailClicked = false;
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
      (res: firebase.auth.UserCredential) => {
        this.users.getUsers('uid', res.user.uid).subscribe(users => {
          this.pinVerified = users[0].payload.doc.data().pinVerified;
          this.errorMessage = '';
          this.successMessage = 'You have successfully logged in';
          if (this.pinVerified) {
            const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/home';
            this.router.navigateByUrl(redirect);
          } else {
            this.router.navigate(['/verify-pin']);
          }
        });
      },
      err => {
        this.errorMessage = err.message;
        this.successMessage = '';
      }
    );
  }

  // onEmailClicked() {
  //   this.emailClicked = true;
  // }
}
