import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { DocumentChangeAction } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';

import { ValidUser } from 'src/app/models/valid-user.model';
import { AuthService } from 'src/app/shared/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { ValidUsersService } from 'src/app/services/valid-users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-pin',
  templateUrl: './verify-pin.component.html',
  styleUrls: ['./verify-pin.component.scss']
})
export class VerifyPinComponent implements OnInit, OnDestroy {
  currentUserEmail: string;
  currentUserDocId: string;
  currentUserSubscription: Subscription;

  pinForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  validUsers$: Observable<DocumentChangeAction<ValidUser>[]>;

  constructor(
    public authService: AuthService,
    public usersService: UsersService,
    public validUsersService: ValidUsersService,
    public fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit() {
    this.createForm();
    this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUserEmail = user.email;
      this.usersService.getUsers('uid', user.uid).subscribe(users => (this.currentUserDocId = users[0].payload.doc.id));
    });
  }

  onSubmit() {
    this.validUsersService.getUsers('email', this.currentUserEmail).subscribe(validUser => {
      // if the pin entered equals the user's pin
      if (validUser[0].payload.doc.data().pin === this.pinForm.value.pin) {
        // do not have the doc ID for the current user yet.  Get it and update the doc
        this.usersService.updateUserData(this.currentUserDocId, { pinVerified: true });
        this.authService.updateUser({ ...JSON.parse(localStorage.getItem('currentUser')), pinVerified: true });
        this.router.navigate(['/home']);
      } else {
        console.log('error');
        this.errorMessage = 'Invalid pin entered.  Please verify pin and contact support if needed.';
      }
    });
  }

  createForm() {
    this.pinForm = this.fb.group({
      pin: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.minLength(4)])
    });
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }
}
