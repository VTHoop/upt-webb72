import { Component, OnInit } from '@angular/core';
import { slider } from '../../animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pilots',
  templateUrl: './pilots.component.html',
  styleUrls: ['./pilots.component.scss'],
  animations: [slider]
})
export class PilotsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
