import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { LoginComponent } from '../authorization/login/login.component';
import { RegisterComponent } from '../authorization/register/register.component';
import { VerifyPinComponent } from '../authorization/verify-pin/verify-pin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingRoutingModule } from './landing-routing.module';
import { FieldStatusComponent } from '../shared/field-status/field-status.component';
import { ForgotPasswordComponent } from '../authorization/forgot-password/forgot-password.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LandingRoutingModule],

  declarations: [
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    VerifyPinComponent,
    FieldStatusComponent,
    ForgotPasswordComponent
  ]
})
export class LandingModule {}
