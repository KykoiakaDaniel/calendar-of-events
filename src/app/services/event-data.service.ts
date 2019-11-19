import { Injectable } from '@angular/core';
import { Event } from '../classes/event';
import { Type } from '../classes/type';

@Injectable({
  providedIn: 'root'
})
export class EventDataService {

  private dataEvent: Event[] = [];
  private dataType: Type[] = [];

  constructor() {
    
  }

  getDataEvent(): Event[] {
    if (this.dataEvent.length == 0) {
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (!key.startsWith(`type-`)) {
          this.dataEvent.push(JSON.parse(localStorage.getItem(key)))
        }
      }
    }
    return this.dataEvent;
  }

  addEvent(date: string, time: string, title: string, description: string, type: string) {
    let newEvent = new Event(date, time, title, description, type);
    localStorage.setItem(`${date}|${time}`, JSON.stringify(newEvent));
    this.dataEvent.push(newEvent);
  }

  removeEvent(date: string, time: string) {
    localStorage.removeItem(`${date}|${time}`);
    let index = this.dataEvent.findIndex(item => item.date == date && item.time == time);
    if (index >= 0) {
      this.dataEvent.splice(index, 1);
    }
  }

  getDataType(): Type[] {
    if (this.dataType.length == 0) {
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith(`type-`)) {
          this.dataType.push(JSON.parse(localStorage.getItem(key)))
        }
      }
    }
    if (this.dataType.length == 0) {
      localStorage.setItem(`type-Праздник`, JSON.stringify(new Type(`Праздник`, `#ff0000`)));
      localStorage.setItem(`type-Личное`, JSON.stringify(new Type(`Личное`, `#00ff00`)));
      localStorage.setItem(`type-Напоминание`, JSON.stringify(new Type(`Напоминание`, `#0000ff`)));
      this.dataType.push(JSON.parse(localStorage.getItem(`type-Праздник`)));
      this.dataType.push(JSON.parse(localStorage.getItem(`type-Личное`)));
      this.dataType.push(JSON.parse(localStorage.getItem(`type-Напоминание`)));
    }
    this.sortType();
    return this.dataType;
  }

  addType(type: string, color: string) {
    let newType = new Type(type, color);
    if (localStorage.getItem(`type-${type}`)) {
      let index = this.dataType.findIndex(item => item.type == type);
      if (index >= 0) {
        this.dataType.splice(index, 1);
      }
    }
    localStorage.setItem(`type-${type}`, JSON.stringify(newType));
    this.dataType.push(newType);
    this.sortType();
  }

  sortType(){
    this.dataType.sort((prev, next) => {
      if (prev.type < next.type) return -1;
      if (prev.type > next.type) return 1;
    });
  }
}
