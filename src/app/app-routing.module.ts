import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { ProfileListComponent } from './components/profile/profile-list/profile-list.component';

const routes: Routes = [
  {
    path: 'pilots',
    component: ProfileListComponent
  },
  {
    path: '',
    component: LandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
