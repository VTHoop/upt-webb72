import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PilotsComponent } from './pilots.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ProfileListComponent } from './profile-list/profile-list.component';

const pilotRoutes: Routes = [
  {
    path: 'pilots',
    component: PilotsComponent,
    children: [
      {
        path: '',
        component: ProfileListComponent,
        data: { animation: 'isLeft' }
      },
      {
        path: ':id',
        component: ViewProfileComponent,
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
