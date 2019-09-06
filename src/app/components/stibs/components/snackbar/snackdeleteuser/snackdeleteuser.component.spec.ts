import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackdeleteuserComponent } from './snackdeleteuser.component';

describe('SnackdeleteuserComponent', () => {
  let component: SnackdeleteuserComponent;
  let fixture: ComponentFixture<SnackdeleteuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackdeleteuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackdeleteuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
