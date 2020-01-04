import { Component, OnInit, Input } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { User, ranks, states } from '../../../models/user.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TigerPhotosService } from '../../../services/tiger-photos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-basic-profile',
  templateUrl: './basic-profile.component.html',
  styleUrls: ['./basic-profile.component.scss']
})
export class BasicProfileComponent implements OnInit {
  @Input() addlUserInfo: DocumentChangeAction<User>[];
  userInfo: User;

  objectKeys = Object.keys;
  afRanks;
  states;

  profileForm: FormGroup;

  constructor(public fb: FormBuilder, public tigerPhotos: TigerPhotosService) {}

  ngOnInit() {
    this.createForm(this.addlUserInfo[0].payload.doc.data());
    this.afRanks = ranks;
    this.states = states;
  }

  createForm(user: User) {
    this.profileForm = this.fb.group({
      email: new FormControl(
        { value: user.email, disabled: true },
        { validators: [Validators.required, Validators.email] }
      ),
      firstName: new FormControl(user.firstName, [Validators.required]),
      middleInitial: new FormControl(user.middleInitial),
      lastName: new FormControl(user.lastName, [Validators.required]),
      nickname: new FormControl(user.nickname),
      hometownCity: new FormControl(user.hometownCity),
      hometownState: new FormControl(user.hometownState),
      rank: new FormControl(user.rank, [Validators.required]),
      school: new FormControl(user.school)
    });
  }

  onSubmit() {
    alert('Im still working on this!');
  }
}
