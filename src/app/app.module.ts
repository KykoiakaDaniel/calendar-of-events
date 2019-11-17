import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MonthComponent } from './month/month.component';

import { MatSliderModule,
         MatGridListModule,
         MatIconModule,
         MatButtonModule,
         MatDialogModule,
         MatFormFieldModule,
         MatOptionModule,
         MatSelectModule,
         MatInputModule,
         MatDatepickerModule,
         MatNativeDateModule,
         } from '@angular/material';
import { EventsDialogComponent } from './events-dialog/events-dialog.component';
import { EventTypeDialogComponent } from './event-type-dialog/event-type-dialog.component';
import { DayComponent } from './day/day.component';

@NgModule({
  declarations: [
    AppComponent,
    MonthComponent,
    EventsDialogComponent,
    EventTypeDialogComponent,
    DayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatGridListModule,
    MatIconModule ,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  entryComponents: [
    EventsDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
