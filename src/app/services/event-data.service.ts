import { Injectable } from "@angular/core";
import { Event } from "../classes/event";
import { Type } from "../classes/type";

@Injectable({
  providedIn: "root"
})
export class EventDataService {
  private dataEvents: Event[] = [];
  private dataTypes: Type[] = [];

  constructor() {}

  getDataEvent(): Event[] {
    if (this.dataEvents.length === 0) {
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (!key.startsWith(`type-`)) {
          this.dataEvents.push(JSON.parse(localStorage.getItem(key)));
        }
      }
    }
    return this.dataEvents;
  }

  addEvent(
    date: string,
    time: string,
    title: string,
    description: string,
    type: string
  ) {
    const newEvent = new Event(date, time, title, description, type);
    localStorage.setItem(`${date}|${time}`, JSON.stringify(newEvent));
    this.dataEvents.push(newEvent);
  }

  removeEvent(date: string, time: string) {
    localStorage.removeItem(`${date}|${time}`);
    let index = this.dataEvents.findIndex(
      item => item.date === date && item.time === time
    );
    if (index >= 0) {
      this.dataEvents.splice(index, 1);
    }
  }

  getDataType(): Type[] {
    if (this.dataTypes.length === 0) {
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith(`type-`)) {
          this.dataTypes.push(JSON.parse(localStorage.getItem(key)));
        }
      }
    }
    if (this.dataTypes.length === 0) {
      const standardTypes: Type[] = [
        new Type(`Праздник`, `#ff0000`),
        new Type(`Личное`, `#00ff00`),
        new Type(`Напоминание`, `#0000ff`)
      ];
      for (let i = 0; i < standardTypes.length; i++) {
        let keyType = this.getKeyType(standardTypes[i].type);
        localStorage.setItem(keyType, JSON.stringify(standardTypes[i]));
        this.dataTypes.push(JSON.parse(localStorage.getItem(keyType)));
      }
    }
    this.sortType();
    return this.dataTypes;
  }

  addType(type: string, color: string) {
    const newType = new Type(type, color);
    const key = this.getKeyType(type);
    if (localStorage.getItem(key)) {
      let index = this.dataTypes.findIndex(item => item.type === type);
      if (index >= 0) {
        this.dataTypes.splice(index, 1);
      }
    }
    localStorage.setItem(key, JSON.stringify(newType));
    this.dataTypes.push(newType);
    this.sortType();
  }

  sortType() {
    this.dataTypes.sort((prev, next) => {
      if (prev.type < next.type) return -1;
      if (prev.type > next.type) return 1;
    });
  }

  getKeyType(word: string): string {
    let key: string = "";
    for (let i = 0; i < word.length; i++) {
      key += word.charCodeAt(i) + "/";
    }
    return `type-${key}`;
  }

  formattingOfTheDate(date: Date): string {
    const Month = date.getMonth() + 1;
    const Day = date.getDate();
    const newMonth: string = Month < 10 ? `0${Month}` : "" + Month;
    const newDay: string = Day < 10 ? `0${Day}` : "" + Day;
    return `${date.getFullYear()}-${newMonth}-${newDay}`;
  }
}
