import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Event } from "../classes/event";

@Component({
  selector: "app-current-event-dialog",
  templateUrl: "./current-event-dialog.component.html",
  styleUrls: ["./current-event-dialog.component.scss"]
})
export class CurrentEventDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CurrentEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Event
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
