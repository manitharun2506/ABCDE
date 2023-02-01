import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdleequipmentsComponent } from './idleequipments.component';

describe('IdleequipmentsComponent', () => {
  let component: IdleequipmentsComponent;
  let fixture: ComponentFixture<IdleequipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdleequipmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdleequipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
