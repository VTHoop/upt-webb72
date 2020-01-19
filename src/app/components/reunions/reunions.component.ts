import { Component, OnInit } from '@angular/core';
import { slider } from '../../animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reunions',
  templateUrl: './reunions.component.html',
  styleUrls: ['./reunions.component.scss'],
  animations: [slider]
})
export class ReunionsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
