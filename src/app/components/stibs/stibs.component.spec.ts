import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StibsComponent } from './stibs.component';

describe('StibsComponent', () => {
  let component: StibsComponent;
  let fixture: ComponentFixture<StibsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StibsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StibsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
