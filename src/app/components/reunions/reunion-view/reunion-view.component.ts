import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  ReunionId,
  ReunionAttendanceId,
  AttendanceStatus,
  ReunionEventId,
  ReunionEventAttendanceId,
  ReunionAttendance
} from 'src/app/models/reunions.model';
import { ReunionsService } from 'src/app/services/reunions.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserId } from 'src/app/models/user.model';
import * as moment from 'moment';

@Component({
  selector: 'app-reunion-view',
  templateUrl: './reunion-view.component.html',
  styleUrls: ['./reunion-view.component.scss']
})
export class ReunionViewComponent implements OnInit, OnDestroy {
  reunion$: Observable<ReunionId>;
  openSubscriptions: Subscription[] = [];

  currentUser: UserId;
  currentUserReunionAttendance: ReunionAttendanceId;
  currentUserReunionEventAttendance: ReunionEventAttendanceId[];

  reunionId: string;
  reunionEvents$: Observable<ReunionEventId[]>;

  yesAttendees: ReunionAttendanceId[];
  maybeAttendees: ReunionAttendanceId[];
  noAttendees: ReunionAttendanceId[];

  yesStatus = AttendanceStatus.YES;
  maybeStatus = AttendanceStatus.MAYBE;
  noStatus = AttendanceStatus.NO;

  constructor(
    private reunions: ReunionsService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.openSubscriptions.push(
      this.authService.currentUser.subscribe(user => {
        this.currentUser = user;
      })
    );
  }

  ngOnInit() {
    this.reunion$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.reunions.getReunionById(params.get('id')))
    );
    this.openSubscriptions.push(
      this.reunion$.subscribe(reunion => {
        this.reunionId = reunion.id;

        this.reunionEvents$ = this.reunions.getReunionEvents(reunion.id);

        this.openSubscriptions.push(
          this.reunions.getReunionEventAttendanceByUser(this.reunionId, this.currentUser.uid).subscribe(events => {
            this.currentUserReunionEventAttendance = events;
          })
        );

        this.openSubscriptions.push(
          this.reunions.getReunionAttendance(reunion.id).subscribe(attendance => {
            this.yesAttendees = attendance.filter(attendee => attendee.status === this.yesStatus);
            this.maybeAttendees = attendance.filter(attendee => attendee.status === this.maybeStatus);
            this.noAttendees = attendance.filter(attendee => attendee.status === this.noStatus);

            this.currentUserReunionAttendance = attendance.filter(attendee => attendee.uid === this.currentUser.uid)[0];
          })
        );
      })
    );
  }

  getCurrentUserStatus(currentUser: ReunionAttendanceId): string {
    return currentUser ? currentUser.status : 'No Response';
  }

  getCurrentUserEventAttendanceStatus(thisEvent: ReunionEventId): string {
    const currentRsvp = this.currentUserReunionEventAttendance.filter(event => event.eventId === thisEvent.id)[0];
    if (currentRsvp) {
      return `You have currently RSVPed: ${currentRsvp.status}`;
    }
    return 'You have not RSVPed for this event';
  }

  updateUserAttendance(attendee: ReunionAttendanceId, attendanceStatus: string) {
    if (attendee) {
      this.reunions.updateReunionAttendance(this.reunionId, attendee.id, { status: attendanceStatus });
    } else {
      this.reunions.addReunionAttendance(this.reunionId, this.createNewAttendance(attendanceStatus));
    }
  }

  updateGuestAttendance(attendee: ReunionAttendanceId, isGuestAttending: boolean) {
    this.reunions.updateReunionAttendance(this.reunionId, attendee.id, { isGuestAttending });
  }

  createNewAttendance(status: string): ReunionAttendance {
    return {
      name: `${this.currentUser.rank} ${this.currentUser.firstName} ${this.currentUser.middleInitial} ${this.currentUser.lastName} (${this.currentUser.nickname})`,
      status,
      uid: this.currentUser.uid,
      isGuestAttending: false
    };
  }

  checkIfMidnight(time: firebase.firestore.Timestamp): boolean {
    return moment(time.toDate()).format('H:mm') === '0:00';
  }

  backToReunions() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.openSubscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
