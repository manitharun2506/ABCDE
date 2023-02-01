import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparepartsComponent } from './spareparts.component';

describe('SparepartsComponent', () => {
  let component: SparepartsComponent;
  let fixture: ComponentFixture<SparepartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SparepartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SparepartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
