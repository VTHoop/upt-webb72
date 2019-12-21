import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/authorization/login/login.component';
import { RegisterComponent } from './components/authorization/register/register.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { LandingComponent } from './components/landing/landing.component';
import { FieldStatusComponent } from './components/shared/field-status/field-status.component';
import { VerifyPinComponent } from './components/authorization/verify-pin/verify-pin.component';
import { BasicProfileComponent } from './components/profile/basic-profile/basic-profile.component';
import { PhonePipe } from './pipes/phone.pipe';
import { ProfileListComponent } from './components/profile/profile-list/profile-list.component';
import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { FullProfileComponent } from './components/profile/full-profile/full-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    FieldStatusComponent,
    VerifyPinComponent,
    BasicProfileComponent,
    PhonePipe,
    ProfileListComponent,
    NavBarComponent,
    HomeComponent,
    FullProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
