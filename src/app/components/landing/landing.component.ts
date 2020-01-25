import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { UsersService } from '../../services/users.service';
import { Router, NavigationEnd } from '@angular/router';
import { take, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  openSubscriptions: Subscription[] = [];
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
              }
            });
        }
      });
    this.openSubscriptions.push(
      this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: NavigationEnd) => {
        this.enableSidebar(e.url);
      })
    );
  }

  enableSidebar(url: string): void {
    url === '/login' || url === '/register' || url === '/verify-pin'
      ? (this.sidebarEnabled = true)
      : (this.sidebarEnabled = false);
  }

  ngOnDestroy() {
    this.openSubscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
