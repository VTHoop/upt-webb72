import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { ValidUser } from 'src/app/models/valid-user.model';
import { AuthService } from 'src/app/shared/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { ValidUsersService } from 'src/app/services/valid-users.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-verify-pin',
  templateUrl: './verify-pin.component.html',
  styleUrls: ['./verify-pin.component.scss']
})
export class VerifyPinComponent implements OnInit {
  // @Input() loggedInUser: Observable<User>;
  @Input() userInfo: User;
  @Input() userDocId: string;
  
  pinForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  validUsers$: Observable<DocumentChangeAction<ValidUser>[]>;
  // isValidUser: boolean;

  constructor(
    public authService: AuthService,
    public usersService: UsersService,
    public validUsersService: ValidUsersService,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this.validUsersService.getUsers('email', this.userInfo.email).subscribe(validUser => {
      // if the pin entered equals the user's pin
      if (validUser[0].payload.doc.data().pin === this.pinForm.value.pin) {
        // do not have the doc ID for the current user yet.  Get it and update the doc
        this.usersService.updateUserData(this.userDocId, { pinVerified: true });
      } else {
        this.errorMessage = 'Invalid pin entered.  Please verify pin and contact support if needed.';
      }
    });
  }

  createForm() {
    this.pinForm = this.fb.group({
      pin: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.minLength(4)])
    });
  }
}
