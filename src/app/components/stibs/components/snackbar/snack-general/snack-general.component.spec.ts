import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackGeneralComponent } from './snack-general.component';

describe('SnackGeneralComponent', () => {
  let component: SnackGeneralComponent;
  let fixture: ComponentFixture<SnackGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
