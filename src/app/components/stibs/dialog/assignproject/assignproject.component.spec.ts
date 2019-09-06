import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignprojectComponent } from './assignproject.component';

describe('AssignprojectComponent', () => {
  let component: AssignprojectComponent;
  let fixture: ComponentFixture<AssignprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
