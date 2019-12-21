import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../shared/auth.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  loggedInUser: firebase.User;
  addlUserInfo$: Observable<DocumentChangeAction<User>[]>;

  constructor(public authService: AuthService, public usersService: UsersService) {}

  ngOnInit() {
    this.authService.getLoggedInUser().subscribe(loggedIn => {
      if (loggedIn) {
        this.loggedInUser = loggedIn;
        this.addlUserInfo$ = this.usersService.getUsers('uid', loggedIn.uid);
      }
    });
  }

  getProfilePic(pilot: User) {
    return `../../../../assets/img/tiger_photos/${pilot.lastName}.jpg`;
  }

  onLogoutClicked() {
    this.authService.doLogout();
  }
}
