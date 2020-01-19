import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReunionsService } from '../../../services/reunions.service';
import { ReunionId } from '../../../models/reunions.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reunion-list',
  templateUrl: './reunion-list.component.html',
  styleUrls: ['./reunion-list.component.scss']
})
export class ReunionListComponent implements OnInit {
  reunions$: Observable<ReunionId[]>;

  constructor(public reunions: ReunionsService, private router: Router) {}

  ngOnInit() {
    this.reunions$ = this.reunions.getReunions(null, null);
  }

  openReunion(reunion: ReunionId) {
    this.router.navigate(['/reunions', reunion.id]);
  }
}
