import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletesollvalueComponent } from './deletesollvalue.component';

describe('DeletesollvalueComponent', () => {
  let component: DeletesollvalueComponent;
  let fixture: ComponentFixture<DeletesollvalueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletesollvalueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletesollvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
