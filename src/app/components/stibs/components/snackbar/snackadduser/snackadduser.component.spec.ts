import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackadduserComponent } from './snackadduser.component';

describe('SnackadduserComponent', () => {
  let component: SnackadduserComponent;
  let fixture: ComponentFixture<SnackadduserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackadduserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackadduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
