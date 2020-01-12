import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PilotsRoutingModule } from './pilots-routing.module';
import { ProfileListComponent } from '../pilots/profile-list/profile-list.component';
import { ViewProfileComponent } from '../pilots/view-profile/view-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ViewProfileComponent, ProfileListComponent],
  imports: [CommonModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, PilotsRoutingModule]
})
export class PilotsModule {}
