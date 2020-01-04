import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ProfileListComponent } from './components/profile/view-profiles/profile-list/profile-list.component';
import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './components/profile/view-profiles/view-profile/view-profile.component';
import { ViewProfilesComponent } from './components/profile/view-profiles/view-profiles.component';

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
    EditProfileComponent,
    ViewProfileComponent,
    ViewProfilesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
