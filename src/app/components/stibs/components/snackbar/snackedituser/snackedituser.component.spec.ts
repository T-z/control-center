import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackedituserComponent } from './snackedituser.component';

describe('SnackedituserComponent', () => {
  let component: SnackedituserComponent;
  let fixture: ComponentFixture<SnackedituserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackedituserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackedituserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
