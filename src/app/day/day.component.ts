import { Component, OnInit } from '@angular/core';
import { Event } from '../classes/event';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDataService } from '../services/event-data.service';
import { MatDialog } from '@angular/material';
import { EventsDialogComponent } from '../events-dialog/events-dialog.component';
import { EventTypeDialogComponent } from '../event-type-dialog/event-type-dialog.component';
import { Subscription } from 'rxjs';
import { CurrentEventDialogComponent } from '../current-event-dialog/current-event-dialog.component';

export class hourEvents {
  constructor(public hour: string,
    public events?: Event[]) { }
}

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  public currentDay: string = "";
  public selectDay: string = "";
  private hours: hourEvents[] = [];
  private allEvents: Event[] = [];
  constructor(private activateRoute: ActivatedRoute, private eventDataService: EventDataService, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.initDay();
  }

  public initDay() {
    this.hours = [];
    this.allEvents = this.eventDataService.getDataEvent();
    this.selectDay = this.activateRoute.snapshot.params['date'];
    let eventOfDay = this.allEvents.filter((item) => item.date == this.selectDay);
    eventOfDay.sort((prev, next) => {
      if (prev.time < next.time) return -1;
      if (prev.time > next.time) return 1;
    });
    for (let i = 0; i < 24; i++) {
      this.hours.push(new hourEvents(`${i}`, []));
    }
    eventOfDay.forEach((item) => {
      let time: number = parseInt(item.time.split(":")[0]);
      this.hours[time].events.push(item);
    });

    this.currentDay = `${this.selectDay.split("-")[2]}.${this.selectDay.split("-")[1]}.${this.selectDay.split("-")[0]}`;
  }

  public async changeDay(diff: number) {
    let selectedDay: string[] = this.activateRoute.snapshot.params['date'].split("-");
    let newDate = new Date(parseInt(selectedDay[0]), parseInt(selectedDay[1]) - 1, parseInt(selectedDay[2]) + diff);
    let newMonth: string = ((newDate.getMonth() + 1) < 10) ? `0${newDate.getMonth() + 1}` : `${newDate.getMonth() + 1}`;
    let newDay: string = (newDate.getDate() < 10) ? `0${newDate.getDate()}` : `${newDate.getDate()}`;
    await this.router.navigate(['/day-calendar', `${newDate.getFullYear()}-${newMonth}-${newDay}`]);
    this.initDay();
  }

  public updateEvent(event: Event) {
    const dialogUpdateRef = this.dialog.open(EventsDialogComponent, {
      width: '450px',
      data: event
    });
    dialogUpdateRef.afterClosed().subscribe(() => {
      this.initDay();
    });
  }

  public removeEvent(event: Event) {
    this.eventDataService.removeEvent(event.date, event.time);
    this.initDay();
  }

  public openEventDialog() {
    const dialogRef = this.dialog.open(EventsDialogComponent, {
      width: '450px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.initDay();
    });
  }

  public openEventTypeDialog() {
    const dialogRef = this.dialog.open(EventTypeDialogComponent, {
      width: '450px',
    });
  }

  public openCurrentEventDialog(event: Event){
    const dialogRef = this.dialog.open(CurrentEventDialogComponent, {
      width: '450px',
      data: event
    });
  }

  public openMonthCalendar() {
    this.router.navigate(['']);
  }

}
