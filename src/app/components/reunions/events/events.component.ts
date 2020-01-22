import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ReunionsService } from 'src/app/services/reunions.service';
import { Subscription, Observable } from 'rxjs';
import { UserId } from 'src/app/models/user.model';
import { ReunionId, ReunionEventId, AttendanceStatus, ReunionAttendanceId } from 'src/app/models/reunions.model';
import { switchMap } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  reunion$: Observable<ReunionId>;
  event$: Observable<ReunionEventId>;
  openSubscriptions: Subscription[] = [];

  currentUser: UserId;
  currentUserAttendance: ReunionAttendanceId;
  reunionId: string;
  eventId: string;

  yesAttendees: ReunionAttendanceId[];
  // maybeAttendees: ReunionAttendanceId[];
  noAttendees: ReunionAttendanceId[];

  // reunionEvents$: Observable<ReunionEventId[]>;

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
    this.reunionId = this.route.snapshot.paramMap.get('id');
    this.eventId = this.route.snapshot.paramMap.get('eventId');

    this.reunion$ = this.reunions.getReunionById(this.reunionId);
    this.event$ = this.reunions.getReunionEventById(this.reunionId, this.eventId);

    this.openSubscriptions.push(
      this.reunions.getReunionEventAttendance(this.reunionId, this.eventId).subscribe(attendance => {
        this.yesAttendees = attendance.filter(attendee => attendee.status === this.yesStatus);
        this.noAttendees = attendance.filter(attendee => attendee.status === this.noStatus);

        this.currentUserAttendance = attendance.filter(attendee => attendee.uid === this.currentUser.uid)[0];
      })
    );
  }

  getCurrentUserStatus(currentUser: ReunionAttendanceId): string {
    return currentUser ? currentUser.status : 'No Response';
  }

  updateUserAttendance(attendee: ReunionAttendanceId, attendanceStatus: string) {
    if (attendee) {
      this.reunions.updateReunionEventAttendance(this.reunionId, this.eventId, attendee.id, {
        status: attendanceStatus
      });
    } else {
      console.log('ready to add attendee');
      this.reunions.addReunionEventAttendance(this.reunionId, this.eventId, this.createNewAttendance(attendanceStatus));
    }
  }

  createNewAttendance(status: string) {
    return {
      name: `${this.currentUser.rank} ${this.currentUser.firstName} ${this.currentUser.middleInitial} ${this.currentUser.lastName} (${this.currentUser.nickname})`,
      status,
      uid: this.currentUser.uid
    };
  }

  getEventLocation(event: ReunionEventId): string {
    return event.location ? event.location : 'TBD';
  }

  checkIfMidnight(time: firebase.firestore.Timestamp): boolean {
    return moment(time.toDate()).format('H:mm') === '0:00';
  }

  backToReunions() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.openSubscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
