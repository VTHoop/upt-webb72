import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AutosizeModule } from 'ngx-autosize';

import { AngularFireModule } from '@angular/fire';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { NavBarComponent } from './components/shared/components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { PilotsComponent } from './components/pilots/pilots.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { PilotsModule } from './components/pilots/pilots.module';
import { LandingModule } from './components/landing/landing.module';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { ReunionsModule } from './components/reunions/reunions.module';
import { ReunionsComponent } from './components/reunions/reunions.component';

@NgModule({
  declarations: [
    AppComponent,
    PilotsComponent,
    ReunionsComponent,
    EditProfileComponent,
    NavBarComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    AutosizeModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    PilotsModule,
    ReunionsModule,
    LandingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
