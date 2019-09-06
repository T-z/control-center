import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsollvalueComponent } from './addsollvalue.component';

describe('AddsollvalueComponent', () => {
  let component: AddsollvalueComponent;
  let fixture: ComponentFixture<AddsollvalueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsollvalueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsollvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
