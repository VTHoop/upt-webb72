import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Observable } from 'rxjs';
import { UserId } from '../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {
  pilots$: Observable<UserId[]>;
  @Output() profileClick: EventEmitter<any> = new EventEmitter();

  constructor(public users: UsersService, public router: Router) {}

  ngOnInit() {
    this.pilots$ = this.users.getPilots();
  }

  getProfilePic(pilot: UserId) {
    return `../../../../assets/img/tiger_photos/${pilot.lastName}.jpg`;
  }

  openProfile(pilot: UserId) {
    this.router.navigate(['/pilots', pilot.id]);
  }
}
