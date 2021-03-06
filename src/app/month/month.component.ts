import { Component, OnInit } from "@angular/core";
import { EventDataService } from "../services/event-data.service";
import { MatDialog } from "@angular/material/dialog";
import { EventsDialogComponent } from "../events-dialog/events-dialog.component";
import { EventTypeDialogComponent } from "../event-type-dialog/event-type-dialog.component";
import { Event } from "../classes/event";
import { Type } from "../classes/type";
import { Router } from "@angular/router";

export interface CurrentDate {
  date: number;
  month: number;
  year: number;
}

@Component({
  selector: "app-month",
  templateUrl: "./month.component.html",
  styleUrls: ["./month.component.scss"]
})
export class MonthComponent implements OnInit {
  public readonly dayNames = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье"
  ];
  public readonly monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
  ];
  public calendar: number[][] = [[]];
  public todayDate: CurrentDate = this.getToday();
  public openDate: CurrentDate = { ...this.todayDate };
  private events: Event[] = [];
  private types: Type[] = [];
  constructor(
    private eventDataService: EventDataService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.events = this.eventDataService.getDataEvent();
    this.types = this.eventDataService.getDataType();
    this.displayCalendar();
  }

  public getToday(): CurrentDate {
    const dateNow = new Date();
    return {
      date: dateNow.getDate(),
      month: dateNow.getMonth() + 1,
      year: dateNow.getFullYear()
    };
  }

  public displayCalendar() {
    const newCalendar = [[]];
    const month = this.openDate.month;
    const year = this.openDate.year;
    const numOfDays = Number(this.getDaysOfMonth(month, year));

    let col = new Date(year, month - 1, 0).getDay();
    let row = 0,
      counter = 1;

    while (counter <= numOfDays) {
      if (col > 6) {
        col = 0;
        newCalendar[++row] = [];
      }
      newCalendar[row][col++] = counter++;
    }
    this.calendar = newCalendar;
  }

  public getDaysOfMonth(month: number, year: number): number {
    if (
      month === 2 &&
      ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
    ) {
      return 29;
    }
    return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
  }

  public selectDay(day: number) {
    const newDate = new Date(this.openDate.year, this.openDate.month - 1, day);
    this.router.navigate([
      "/day-calendar",
      this.eventDataService.formattingOfTheDate(newDate)
    ]);
  }

  public changeMonth(diff: number) {
    this.openDate.month += diff;

    if (this.openDate.month > 12) {
      this.openDate.month = 1;
      this.openDate.year++;
    }

    if (this.openDate.month < 1) {
      this.openDate.month = 12;
      this.openDate.year--;
    }

    this.displayCalendar();
  }

  public isToday(day: number): boolean {
    return (
      day === this.todayDate.date &&
      this.openDate.month === this.todayDate.month &&
      this.openDate.year === this.todayDate.year
    );
  }

  public isEvent(day: number): string {
    const newDate = new Date(this.openDate.year, this.openDate.month - 1, day);
    const updatedDate = this.eventDataService.formattingOfTheDate(newDate);
    let indexEvent = this.events.findIndex(item => item.date === updatedDate);
    if (indexEvent >= 0) {
      let indexColor = this.types.findIndex(
        item => item.type === this.events[indexEvent].type
      );
      return this.types[indexColor].color;
    }
    return null;
  }

  public openEventDialog() {
    const dialogRef = this.dialog.open(EventsDialogComponent, {
      width: "450px",
      data: {}
    });
  }

  public openEventTypeDialog() {
    const dialogRef = this.dialog.open(EventTypeDialogComponent, {
      width: "450px"
    });
  }
}
