import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventDataService } from '../services/event-data.service';

@Component({
  selector: 'app-event-type-dialog',
  templateUrl: './event-type-dialog.component.html',
  styleUrls: ['./event-type-dialog.component.scss']
})
export class EventTypeDialogComponent implements OnInit {

  constructor( private eventDataService: EventDataService, 
    public dialogRef: MatDialogRef<EventTypeDialogComponent>) {}

  ngOnInit() {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
