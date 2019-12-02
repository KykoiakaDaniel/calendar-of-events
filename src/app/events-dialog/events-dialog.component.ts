import { Component, OnInit, Inject, Input } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { EventDataService } from "../services/event-data.service";
import { Event } from "../classes/event";
import { Type } from "../classes/type";

@Component({
  selector: "app-events-dialog",
  templateUrl: "./events-dialog.component.html",
  styleUrls: ["./events-dialog.component.scss"]
})
export class EventsDialogComponent implements OnInit {
  public title: string = this.data.title || "";
  public type: string = this.data.type || "";
  public description: string = this.data.description || "";
  public date: string = this.data.date || "";
  public time: string = this.data.time || "";
  private events: Event[] = [];
  private types: Type[] = [];
  private error: boolean;

  constructor(
    private eventDataService: EventDataService,
    public dialogRef: MatDialogRef<EventsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Event
  ) {}

  ngOnInit() {
    this.events = this.eventDataService.getDataEvent();
    this.types = this.eventDataService.getDataType();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onAddClick() {
    this.error = false;
    if (
      this.title.length > 1 &&
      this.title.length < 11 &&
      this.type !== "" &&
      this.date !== "" &&
      this.time !== ""
    ) {
      const newDate = new Date(this.date);
      let updatedDate: string = this.eventDataService.formattingOfTheDate(
        newDate
      );

      if (this.data.date === updatedDate && this.data.time === this.time) {
        this.eventDataService.removeEvent(this.data.date, this.data.time);
        this.eventDataService.addEvent(
          updatedDate,
          this.time,
          this.title,
          this.description,
          this.type
        );
        this.dialogRef.close();
      } else {
        if (
          !this.events.find(
            item => item.date === updatedDate && item.time === this.time
          )
        ) {
          if (this.data.date !== undefined) {
            this.eventDataService.removeEvent(this.data.date, this.data.time);
          }
          this.eventDataService.addEvent(
            updatedDate,
            this.time,
            this.title,
            this.description,
            this.type
          );
          this.dialogRef.close();
        } else {
          this.error = true;
        }
      }
    }
  }
}
