import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnacksyncComponent } from './snacksync.component';

describe('SnacksyncComponent', () => {
  let component: SnacksyncComponent;
  let fixture: ComponentFixture<SnacksyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnacksyncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnacksyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
