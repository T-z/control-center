import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackaddvehicleComponent } from './snackaddvehicle.component';

describe('SnackaddvehicleComponent', () => {
  let component: SnackaddvehicleComponent;
  let fixture: ComponentFixture<SnackaddvehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackaddvehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackaddvehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
