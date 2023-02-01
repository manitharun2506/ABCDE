import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpencetypeComponent } from './expencetype.component';

describe('ExpencetypeComponent', () => {
  let component: ExpencetypeComponent;
  let fixture: ComponentFixture<ExpencetypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpencetypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpencetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
