import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPreUsersComponent } from './add-pre-users/add-pre-users.component';
import { AdminRoutingModule } from './admin-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddPreUsersComponent],
  imports: [CommonModule, ReactiveFormsModule, BrowserAnimationsModule, AdminRoutingModule]
})
export class AdminModule {}
