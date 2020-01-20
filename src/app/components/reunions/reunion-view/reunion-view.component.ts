import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ReunionId, ReunionAttendanceId, AttendanceStatus } from 'src/app/models/reunions.model';
import { ReunionsService } from 'src/app/services/reunions.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserId } from 'src/app/models/user.model';

@Component({
  selector: 'app-reunion-view',
  templateUrl: './reunion-view.component.html',
  styleUrls: ['./reunion-view.component.scss']
})
export class ReunionViewComponent implements OnInit, OnDestroy {
  reunion$: Observable<ReunionId>;
  reunionSubscription: Subscription;
  attendanceSubscription: Subscription;
  currentUserSubscription: Subscription;

  currentUser: UserId;
  currentUserAttendance: ReunionAttendanceId;
  reunionId: string;

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
    this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.reunion$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.reunions.getReunionById(params.get('id')))
    );
    this.reunionSubscription = this.reunion$.subscribe(reunion => {
      this.reunionId = reunion.id;
      this.attendanceSubscription = this.reunions.getReunionAttendance(reunion.id).subscribe(attendance => {
        this.yesAttendees = attendance.filter(attendee => attendee.status === this.yesStatus);
        this.maybeAttendees = attendance.filter(attendee => attendee.status === this.maybeStatus);
        this.noAttendees = attendance.filter(attendee => attendee.status === this.noStatus);

        this.currentUserAttendance = attendance.filter(attendee => attendee.uid === this.currentUser.uid)[0];
      });
    });
  }

  getCurrentUserStatus(currentUser: ReunionAttendanceId): string {
    return currentUser ? currentUser.status : 'No Response';
  }

  updateUserAttendance(attendee: ReunionAttendanceId, attendanceStatus: string) {
    if (attendee) {
      this.reunions.updateReunionAttendance(this.reunionId, attendee.id, { status: attendanceStatus });
    } else {
      this.reunions.addReunionAttendance(this.reunionId, this.createNewAttendance(attendanceStatus));
    }
  }

  createNewAttendance(status: string) {
    return {
      name: `${this.currentUser.rank} ${this.currentUser.firstName} ${this.currentUser.middleInitial} ${this.currentUser.lastName} (${this.currentUser.nickname})`,
      status,
      uid: this.currentUser.uid
    };
  }

  backToReunions() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.reunionSubscription.unsubscribe();
    this.attendanceSubscription.unsubscribe();
  }
}
