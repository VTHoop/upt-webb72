import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { UsersService } from '../../services/users.service';
import { Observable } from 'rxjs';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  isUserLoggedIn: boolean;
  sidebarEnabled: boolean;

  constructor(public authService: AuthService, public usersService: UsersService, private router: Router) {}

  ngOnInit() {
    this.authService.getLoggedInUser().subscribe(loggedIn => {
      if (loggedIn) {
        this.usersService.getUsers('uid', loggedIn.uid).subscribe(users => {
          if (!users[0].payload.doc.data().pinVerified) {
            this.router.navigate(['verify-pin']);
            this.sidebarEnabled = true;
          }
        });
        this.isUserLoggedIn = true;
      } else {
        this.isUserLoggedIn = false;
      }
    });
    this.router.url === '/login' || this.router.url === '/register' ? this.sidebarEnabled = true : this.sidebarEnabled = false;
  }

  onActionClicked() {
    this.sidebarEnabled = true;
  }
}
