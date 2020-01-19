import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserId } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // currentUserSubscription: Subscription;
  // currentUser: UserId;
  currentUser$: Observable<UserId>;

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.currentUser$ = this.authService.currentUser;
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToPilots() {
    this.router.navigate(['/pilots']);
  }

  goToReunions() {
    this.router.navigate(['/reunions']);
  }

  setBackground(currentUser: UserId) {
    return `linear-gradient(to right, rgba(128, 128, 128, 0.8), rgba(52, 52, 52, 0.8)), url('${this.getSectionPhoto(currentUser)}')`;
  }

  getSectionPhoto(currentUser: UserId) {
    return `../../../assets/img/section${currentUser.section}.jpeg`;
  }
}
