import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  loggedInUser$: Observable<User>;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.loggedInUser$ = this.authService.getLoggedInUser();
  }
}
