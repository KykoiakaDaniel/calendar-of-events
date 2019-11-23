import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentEventDialogComponent } from './current-event-dialog.component';

describe('CurrentEventDialogComponent', () => {
  let component: CurrentEventDialogComponent;
  let fixture: ComponentFixture<CurrentEventDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentEventDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
