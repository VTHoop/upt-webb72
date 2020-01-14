import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { LoginComponent } from '../authorization/login/login.component';
import { RegisterComponent } from '../authorization/register/register.component';
import { VerifyPinComponent } from '../authorization/verify-pin/verify-pin.component';
import { IsLoggedIn } from '../../shared/resolvers/is-logged-in';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const landingRoutes: Routes = [
  {
    path: '',
    component: LandingComponent,
    resolve: [IsLoggedIn],
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { animation: 'isRight' }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { animation: 'isRight' }
      },
      {
        path: 'verify-pin',
        component: VerifyPinComponent,
        data: { animation: 'isRight' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(landingRoutes)],
  exports: [RouterModule]
})
export class LandingRoutingModule {}
