import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPassengersComponent } from './view-passengers.component';

describe('ViewPassengersComponent', () => {
  let component: ViewPassengersComponent;
  let fixture: ComponentFixture<ViewPassengersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPassengersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
