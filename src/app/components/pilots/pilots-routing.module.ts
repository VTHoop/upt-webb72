import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PilotsComponent } from './pilots.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const pilotRoutes: Routes = [
  {
    path: 'pilots',
    component: PilotsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ProfileListComponent,
        canActivateChild: [AuthGuard],
        data: { animation: 'isLeft' }
      },
      {
        path: ':id',
        component: ViewProfileComponent,
        canActivateChild: [AuthGuard],
        data: { animation: 'isRight' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(pilotRoutes)],
  exports: [RouterModule]
})
export class PilotsRoutingModule {}
