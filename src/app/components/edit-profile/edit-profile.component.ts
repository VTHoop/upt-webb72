import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User, ranks, states, UserId } from '../../models/user.model';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  currentUser: UserId;
  currentUserSubscription: Subscription;

  fullProfileForm: FormGroup;
  currentProfilePic$: Observable<string>;

  objectKeys = Object.keys;
  afRanks;
  states;

  constructor(
    public authService: AuthService,
    public fb: FormBuilder,
    public usersService: UsersService,
    public storage: StorageService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
      this.currentProfilePic$ = this.getCurrentProfilePic(user);
      this.currentUser = user;
    });
    this.createForm(this.currentUser);
    this.afRanks = ranks;
    this.states = states;
  }

  onSubmit(value: User) {
    this.usersService
      .getUserById(this.currentUser.id)
      .pipe(take(1))
      .subscribe(user => {
        this.usersService.updateUserData(user.id, value).then(res => {
          this.toastr.success(res);
          const updatedUserData: UserId = {
            ...this.currentUser,
            ...value
          };
          this.authService.updateUser(updatedUserData);
          this.fullProfileForm.markAsPristine();
          this.fullProfileForm.markAsUntouched();
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
    return `url('../../../../assets/img/tiger_photos/${pilot.lastName}.jpg')`;
  }

  getCurrentProfilePic(pilot: UserId) {
    if (pilot.profilePhotoLocation) {
      return this.storage.getCurrentProfilePhoto(pilot.profilePhotoLocation);
    }
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }
}
