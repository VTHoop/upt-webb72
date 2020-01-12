import { Component, OnInit } from '@angular/core';
import { User, ranks, states } from '../../../models/user.model';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DocumentChangeAction } from '@angular/fire/firestore';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  pilots$: Observable<DocumentChangeAction<User>[]>;

  fullProfileForm: FormGroup;

  objectKeys = Object.keys;
  afRanks;
  states;

  constructor(
    private fb: FormBuilder,
    private users: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.pilots$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.users.getUsers('uid', params.get('id')))
    );
    this.pilots$.subscribe(pilots => this.createForm(pilots[0].payload.doc.data()));
    this.afRanks = ranks;
    this.states = states;
  }

  createForm(user: User) {
    this.fullProfileForm = this.fb.group({
      email: new FormControl({ value: user.email, disabled: true }),
      nickname: new FormControl({ value: user.nickname, disabled: true }),
      hometownCity: new FormControl({ value: user.hometownCity, disabled: true }),
      hometownState: new FormControl({ value: user.hometownState, disabled: true }),
      rank: new FormControl({ value: user.rank, disabled: true }),
      school: new FormControl({ value: user.school, disabled: true }),
      streetAddress: new FormControl({ value: user.streetAddress, disabled: true }),
      currentCity: new FormControl({ value: user.currentCity, disabled: true }),
      currentState: new FormControl({ value: user.currentState, disabled: true }),
      currentZip: new FormControl({ value: user.currentZip, disabled: true }),
      homePhone: new FormControl({ value: user.homePhone, disabled: true }),
      cellPhone: new FormControl({ value: user.cellPhone, disabled: true }),
      emailPrivate: new FormControl({ value: user.emailPrivate, disabled: true }),
      myLife: new FormControl({ value: user.myLife, disabled: true })
    });
  }

  getProfilePic(pilot: User) {
    return `../../../../assets/img/tiger_photos/${pilot.lastName}.jpg`;
  }

  backToPilots() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
