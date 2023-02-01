import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechinesetupComponent } from './mechinesetup.component';

describe('MechinesetupComponent', () => {
  let component: MechinesetupComponent;
  let fixture: ComponentFixture<MechinesetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MechinesetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechinesetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
