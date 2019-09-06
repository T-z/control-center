import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsollvalueComponent } from './editsollvalue.component';

describe('EditsollvalueComponent', () => {
  let component: EditsollvalueComponent;
  let fixture: ComponentFixture<EditsollvalueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsollvalueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsollvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
