import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../shared/auth.service';
import { User, ranks, states } from '../../../models/user.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;

  fullProfileForm: FormGroup;

  objectKeys = Object.keys;
  afRanks;
  states;

  constructor(public authService: AuthService, public fb: FormBuilder, public usersService: UsersService) {
    this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.createForm(this.currentUser);
    this.afRanks = ranks;
    this.states = states;
  }

  onSubmit(value: User) {
    this.usersService.getUsers('uid', this.currentUser.uid).subscribe(users => {
      this.usersService.updateUserData(users[0].payload.doc.id, value).then(() => {
        const updatedUserData: User = {
          ...this.currentUser,
          ...value
        };
        this.authService.updateUser(updatedUserData);
      });
    });
  }

  createForm(user: User) {
    this.fullProfileForm = this.fb.group({
      email: new FormControl(
        { value: user.email, disabled: true },
        { validators: [Validators.required, Validators.email] }
      ),
      nickname: new FormControl(user.nickname),
      hometownCity: new FormControl(user.hometownCity),
      hometownState: new FormControl(user.hometownState),
      rank: new FormControl(user.rank, [Validators.required]),
      school: new FormControl(user.school),
      streetAddress: new FormControl(user.streetAddress),
      currentCity: new FormControl(user.currentCity),
      currentState: new FormControl(user.currentState),
      currentZip: new FormControl(user.currentZip),
      homePhone: new FormControl(user.homePhone, { validators: [Validators.maxLength(10), Validators.minLength(10)] }),
      cellPhone: new FormControl(user.cellPhone, { validators: [Validators.maxLength(10), Validators.minLength(10)] }),
      emailPrivate: new FormControl(user.emailPrivate),
      myLife: new FormControl(user.myLife)
    });
  }

  getProfilePic(pilot: User) {
    return `../../../../assets/img/tiger_photos/${pilot.lastName}.jpg`;
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }
}
