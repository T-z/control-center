import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackarchivComponent } from './snackarchiv.component';

describe('SnackarchivComponent', () => {
  let component: SnackarchivComponent;
  let fixture: ComponentFixture<SnackarchivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackarchivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackarchivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
