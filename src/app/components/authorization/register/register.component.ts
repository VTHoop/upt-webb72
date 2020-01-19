import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { ValidUsersService } from '../../../services/valid-users.service';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { ValidUser, ValidUserId } from 'src/app/models/valid-user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;
  successMessage: string;

  constructor(public authService: AuthService, public validUsersService: ValidUsersService, public fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this.validUsersService
      .getUsers('email', this.registerForm.value.email)
      .pipe(take(1))
      .subscribe(users => {
        if (users.length === 1) {
          if (!users[0].registered) {
            this.tryRegister(this.registerForm.value, users[0]);
          } else {
            this.errorMessage = 'You have already registered.  Please login to continue.';
          }
        } else {
          this.errorMessage = 'That user is not valid.  Please contact support.';
        }
      });
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  formStatus() {
    console.log(this.registerForm);
  }

  tryRegister(value, validUser: ValidUserId) {
    this.authService.doRegister(value, validUser).then(
      res => {
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
