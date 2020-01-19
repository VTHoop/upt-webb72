import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { UsersService } from '../../services/users.service';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Subscription, pipe } from 'rxjs';
import { take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  sidebarEnabled: boolean;

  constructor(public authService: AuthService, public usersService: UsersService, private router: Router) {}

  ngOnInit() {
    this.enableSidebar(this.router.url);

    this.authService
      .getLoggedInUser()
      .pipe(take(1))
      .subscribe((loggedIn: firebase.User) => {
        if (loggedIn) {
          this.usersService
            .getUsers('uid', loggedIn.uid)
            .pipe(take(1))
            .subscribe(users => {
              if (!users[0].pinVerified) {
                this.router.navigate(['/verify-pin']);
                this.sidebarEnabled = true;
              }
              // else {
              //   if (this.router.url === '/') {
              //     this.router.navigate(['/home']);
              //   }
              // }
            });
        }
      });
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: NavigationEnd) => {
      this.enableSidebar(e.url);
    });
  }

  enableSidebar(url: string): void {
    url === '/login' || url === '/register' ? (this.sidebarEnabled = true) : (this.sidebarEnabled = false);
  }
}
