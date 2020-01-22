import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReunionsRoutingModule } from './reunions-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReunionListComponent } from './reunion-list/reunion-list.component';
import { ReunionViewComponent } from './reunion-view/reunion-view.component';
import { EventsComponent } from './events/events.component';

@NgModule({
  declarations: [ReunionListComponent, ReunionViewComponent, EventsComponent],
  imports: [CommonModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, ReunionsRoutingModule]
})
export class ReunionsModule {}
