import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { ReunionsService } from '../../../services/reunions.service';
import { Reunion } from '../../../models/reunions.model';

@Component({
  selector: 'app-reunion-list',
  templateUrl: './reunion-list.component.html',
  styleUrls: ['./reunion-list.component.scss']
})
export class ReunionListComponent implements OnInit {
  reunions$: Observable<DocumentChangeAction<Reunion>[]>;

  constructor(public reunions: ReunionsService) {}

  ngOnInit() {
    this.reunions$ = this.reunions.getReunions(null, null);
  }
}
