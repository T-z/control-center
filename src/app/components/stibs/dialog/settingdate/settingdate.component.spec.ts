import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingdateComponent } from './settingdate.component';

describe('SettingdateComponent', () => {
  let component: SettingdateComponent;
  let fixture: ComponentFixture<SettingdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
