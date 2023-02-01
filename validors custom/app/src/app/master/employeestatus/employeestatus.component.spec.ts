import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeestatusComponent } from './employeestatus.component';

describe('EmployeestatusComponent', () => {
  let component: EmployeestatusComponent;
  let fixture: ComponentFixture<EmployeestatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeestatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
