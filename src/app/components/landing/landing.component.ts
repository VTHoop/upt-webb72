import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { UsersService } from '../../services/users.service';
import { Router, NavigationEnd } from '@angular/router';
import { take, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UserId } from 'src/app/models/user.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  openSubscriptions: Subscription[] = [];
  sidebarEnabled: boolean;

  currentUser: UserId;

  actionRoutes: string[] = ['/login', '/register', '/verify-pin', '/forgot-password', '/auth/action'];

  constructor(public authService: AuthService, public usersService: UsersService, private router: Router) {}

  ngOnInit() {
    this.enableSidebar(this.router.url.split('?')[0]);

    this.authService.currentUser.pipe(take(1)).subscribe(user => {
      if (user && !user.pinVerified) {
        this.router.navigate(['/verify-pin']);
      }
    });

    this.openSubscriptions.push(
      this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: NavigationEnd) => {
        this.enableSidebar(e.url.split('?')[0]);
      })
    );
  }

  enableSidebar(url: string): void {
    this.actionRoutes.includes(url) ? (this.sidebarEnabled = true) : (this.sidebarEnabled = false);
  }

  ngOnDestroy() {
    this.openSubscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
