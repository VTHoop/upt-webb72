import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { DocumentChangeAction } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {
  pilots$: Observable<DocumentChangeAction<User>[]>;

  constructor(public users: UsersService) {}

  ngOnInit() {
    this.pilots$ = this.users.getUsers(null, null);
  }

  getProfilePic(pilot: User) {
    return `../../../../assets/img/tiger_photos/${pilot.lastName}.jpg`;
  }
}
