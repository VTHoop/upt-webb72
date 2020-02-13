import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { ReunionsComponent } from './reunions.component';
import { ReunionListComponent } from './reunion-list/reunion-list.component';
import { ReunionViewComponent } from './reunion-view/reunion-view.component';
import { EventsComponent } from './events/events.component';
import { UnderConstructionComponent } from '../shared/under-construction/under-construction.component';

const reunionRoutes: Routes = [
  {
    path: 'reunions',
    component: ReunionsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ReunionListComponent,
        canActivateChild: [AuthGuard],
        data: { animation: 'isLeft' }
      },
      {
        path: 'under-construction',
        component: UnderConstructionComponent,
        canActivateChild: [AuthGuard],
        data: { animation: 'isRight' }
      },
      {
        path: ':id',
        component: ReunionViewComponent,
        canActivateChild: [AuthGuard],
        data: { animation: 'isRight' }
      },
      {
        path: ':id/events/:eventId',
        component: EventsComponent,
        canActivateChild: [AuthGuard],
        data: { animation: 'isLeft' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(reunionRoutes)],
  exports: [RouterModule]
})
export class ReunionsRoutingModule {}
