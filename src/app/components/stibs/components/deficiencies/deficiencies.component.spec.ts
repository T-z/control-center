import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeficienciesComponent } from './deficiencies.component';

describe('DeficienciesComponent', () => {
  let component: DeficienciesComponent;
  let fixture: ComponentFixture<DeficienciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeficienciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeficienciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
