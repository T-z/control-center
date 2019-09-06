import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarHorizontalChartComponent } from './bar-horizontal-chart.component';

describe('BarHorizontalChartComponent', () => {
  let component: BarHorizontalChartComponent;
  let fixture: ComponentFixture<BarHorizontalChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarHorizontalChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarHorizontalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
