import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventDataService } from '../services/event-data.service';
import { Type } from '../classes/type';

@Component({
  selector: 'app-event-type-dialog',
  templateUrl: './event-type-dialog.component.html',
  styleUrls: ['./event-type-dialog.component.scss']
})
export class EventTypeDialogComponent implements OnInit {
  public newType: string = "";
  public newColor: string = "#ff0000";
  public errorCount: boolean = false;
  public errorExistence: boolean = false;
  private types: Type[] = [];
  constructor(private eventDataService: EventDataService,
    public dialogRef: MatDialogRef<EventTypeDialogComponent>) { }

  ngOnInit() {
    this.types = this.eventDataService.getDataType();
  }

  onColorChange(type: string, color: string) {
    this.eventDataService.addType(type, color);
  }

  onAddClick() {
    if (this.newType.length > 0 && this.newType.length < 16) {
      let index = this.types.findIndex(item => item.type == this.newType);
      if (index >= 0) {
        this.errorExistence = true;
        return;
      }
      else {
        this.eventDataService.addType(this.newType, this.newColor);
        this.newColor = "#ff0000";
        this.newType = "";
        this.errorCount = false;
        this.errorExistence = false;
      }
    }
    else {
      this.errorCount = true;
    }

  }
  onCloseClick(): void {
    this.dialogRef.close();
  }

}
