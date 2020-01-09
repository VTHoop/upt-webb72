import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { ViewProfilesComponent } from './components/profile/view-profiles/view-profiles.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { HomeComponent } from './components/home/home.component';
import { ReunionsComponent } from './components/reunions/reunions.component';

const routes: Routes = [
  {
    path: 'pilots',
    component: ViewProfilesComponent
  },
  {
    path: 'profile',
    component: EditProfileComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'reunions',
    component: ReunionsComponent
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
