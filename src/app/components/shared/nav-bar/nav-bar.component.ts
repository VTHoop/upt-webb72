import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../shared/auth.service';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;

  @Input() disableActions: boolean;

  constructor(public authService: AuthService, public usersService: UsersService, public router: Router) {
    this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {}

  getProfilePic(pilot: User) {
    return `../../../../assets/img/tiger_photos/${pilot.lastName}.jpg`;
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  onLogoutClicked() {
    this.authService.doLogout();
  }
}
