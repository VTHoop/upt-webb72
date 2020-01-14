import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './components/home/home.component';
import { ReunionsComponent } from './components/reunions/reunions.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reunions',
    component: ReunionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: EditProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
