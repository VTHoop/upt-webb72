import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { LoginComponent } from '../authorization/login/login.component';
import { RegisterComponent } from '../authorization/register/register.component';
import { VerifyPinComponent } from '../authorization/verify-pin/verify-pin.component';
import { IsLoggedIn } from 'src/app/shared/resolvers/is-logged-in';
import { ForgotPasswordComponent } from '../authorization/forgot-password/forgot-password.component';
import { ConfirmPasswordResetComponent } from '../authorization/confirm-password-reset/confirm-password-reset.component';

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
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: { animation: 'isRight' }
      },
      {
        path: 'auth/action',
        component: ConfirmPasswordResetComponent,
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
