import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateviewerComponent } from './dateviewer.component';

describe('DateviewerComponent', () => {
  let component: DateviewerComponent;
  let fixture: ComponentFixture<DateviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
