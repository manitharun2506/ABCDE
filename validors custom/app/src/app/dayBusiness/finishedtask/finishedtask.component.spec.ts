import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedtaskComponent } from './finishedtask.component';

describe('FinishedtaskComponent', () => {
  let component: FinishedtaskComponent;
  let fixture: ComponentFixture<FinishedtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishedtaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
