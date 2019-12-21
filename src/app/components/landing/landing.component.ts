import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { UsersService } from '../../services/users.service';
import { Observable } from 'rxjs';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  isUserLoggedIn: boolean;
  addlUserInfo$: Observable<DocumentChangeAction<User>[]>;

  loginEnabled: boolean;
  registerEnabled: boolean;
  sidebarEnabled: boolean;

  constructor(public authService: AuthService, public usersService: UsersService) {}

  ngOnInit() {
    this.loginEnabled = false;
    this.registerEnabled = false;
    this.authService.getLoggedInUser().subscribe(loggedIn => {
      if (loggedIn) {
        this.isUserLoggedIn = true;
        this.addlUserInfo$ = this.usersService.getUsers('uid', loggedIn.uid);
        this.sidebarEnabled = true;
      } else {
        this.isUserLoggedIn = false;
        this.sidebarEnabled = false;
      }
    });
  }

  onLoginClicked() {
    this.loginEnabled = true;
    this.registerEnabled = false;
    this.sidebarEnabled = true;
  }

  onRegisterClicked() {
    this.loginEnabled = false;
    this.registerEnabled = true;
    this.sidebarEnabled = true;
  }

  onLogoutClicked() {
    this.loginEnabled = false;
    this.registerEnabled = false;
    this.sidebarEnabled = false;
    this.authService.doLogout();
  }
}
