import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTrajetComponent } from './assign-trajet.component';

describe('AssignTrajetComponent', () => {
  let component: AssignTrajetComponent;
  let fixture: ComponentFixture<AssignTrajetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignTrajetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignTrajetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
