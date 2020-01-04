import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-view-profiles',
  templateUrl: './view-profiles.component.html',
  styleUrls: ['./view-profiles.component.scss'],
  animations: [
    trigger('flyInFromLeft', [
      state('in', style({ transform: 'translateX(0)', display: 'visible' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)', display: 'hidden' }),
        animate('.3s .3s ease-in-out')
      ])
    ]),
    trigger('flyInFromRight', [
      state('in', style({ transform: 'translateX(0)', display: 'visisble' })),
      transition(':enter', [style({ transform: 'translateX(100%)', display: 'hidden' }), animate('.3s ease-in-out')])
    ])
  ]
})
export class ViewProfilesComponent implements OnInit {
  profileSelected: boolean;
  pilotSelected: User;

  constructor() {}

  ngOnInit() {
    this.profileSelected = false;
  }

  showProfile(pilot) {
    this.profileSelected = true;
    this.pilotSelected = pilot;
  }

  comeBack() {
    this.profileSelected = false;
  }

  logAnimation(event) {
    console.log(event);
  }
}
