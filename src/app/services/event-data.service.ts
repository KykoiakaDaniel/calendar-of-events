import { Injectable } from '@angular/core';
import {Event} from '../classes/event';
import {Type} from '../classes/type';

@Injectable({
  providedIn: 'root'
})
export class EventDataService {

  private dataEvent: Event[] = [];
  private dataType: Type[] = [];

  constructor() { 

  }
  
  getDataEvent(): Event[] {
    if(this.dataEvent.length == 0){
      for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        this.dataEvent.push(JSON.parse(localStorage.getItem(key)))
      }
    }
    return this.dataEvent;
  }

  addEvent(date: string, time: string, title: string, description: string, type: string){     
    let newEvent = new Event(date, time, title, description, type);
    localStorage.setItem(`${date}|${time}`,JSON.stringify(newEvent));  
    this.dataEvent.push(newEvent);
  }

  removeEvent(date: string, time: string){
    localStorage.removeItem(`${date}|${time}`);
    let index = this.dataEvent.findIndex(item => item.date == date && item.time == time);
    if(index >= 0){
      this.dataEvent.splice(index,1);
    }
  }

  // getDataType(): Type[] {
  //   if(this.dataType.length == 0){
  //     for(let i=0; i<localStorage.length; i++) {
  //       let key = localStorage.key(i);
  //       this.dataEvent.push(JSON.parse(localStorage.getItem(key)))
  //     }
  //   }
  //   return this.dataEvent;
  // }

}
