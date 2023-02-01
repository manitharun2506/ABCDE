import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingtaskComponent } from './ongoingtask.component';

describe('OngoingtaskComponent', () => {
  let component: OngoingtaskComponent;
  let fixture: ComponentFixture<OngoingtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngoingtaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngoingtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
