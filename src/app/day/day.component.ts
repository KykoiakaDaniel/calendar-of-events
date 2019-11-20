import { Component, OnInit } from '@angular/core';
import { Event } from '../classes/event';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDataService } from '../services/event-data.service';
import { MatDialog } from '@angular/material';
import { EventsDialogComponent } from '../events-dialog/events-dialog.component';
import { EventTypeDialogComponent } from '../event-type-dialog/event-type-dialog.component';
import { Subscription } from 'rxjs';

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
  private hours: hourEvents[] = [];
  private allEvents: Event[] = [];
  private subscription: Subscription;
  constructor(private activateRoute: ActivatedRoute, private eventDataService: EventDataService, private router: Router, public dialog: MatDialog) {
    //this.subscription = activateRoute.params.subscribe(params => this.date = params['date']);
  }

  ngOnInit() {
    this.allEvents = this.eventDataService.getDataEvent();
    let selectDay = this.activateRoute.snapshot.params['date'];
    let eventOfDay = this.allEvents.filter((item) => item.date == selectDay);
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

    this.currentDay = `${selectDay.split("-")[2]}.${selectDay.split("-")[1]}.${selectDay.split("-")[0]}`;
  }
  

  public changeDay(diff: number) {
    let selectedDay: string[] = this.activateRoute.snapshot.params['date'].split("-");
    let newDate = new Date(parseInt(selectedDay[0]), parseInt(selectedDay[1]) - 1, parseInt(selectedDay[2]) + diff);
    let newMonth: string = ((newDate.getMonth() + 1) < 10) ? `0${newDate.getMonth() + 1}` : `${newDate.getMonth() + 1}`;
    let newDay: string = (newDate.getDate() < 10) ? `0${newDate.getDate()}` : `${newDate.getDate()}`;
    this.router.navigate(['/day-calendar', `${newDate.getFullYear()}-${newMonth}-${newDay}`]);
  }

  public openEventDialog() {
    const dialogRef = this.dialog.open(EventsDialogComponent, {
      width: '450px',
      //data: new Event("2019-12-08", "10:35", "Novinka", "", "Праздник")
      data: {}
    });
  }

  public openEventTypeDialog() {
    const dialogRef = this.dialog.open(EventTypeDialogComponent, {
      width: '450px',
      //data: new Event("2019-12-08", "10:35", "Novinka", "", "Праздник")
      //data: {}
    });
  }
  public openMonthCalendar() {
    this.router.navigate(['']);
  }

}
