import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AdminComponent } from './admin.component';
import { AddPreUsersComponent } from './add-pre-users/add-pre-users.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'preusers/add',
        component: AddPreUsersComponent,
        canActivateChild: [AuthGuard],
        data: { animation: 'isLeft' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
