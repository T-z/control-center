import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingvehicleComponent } from './settingvehicle.component';

describe('SettingvehicleComponent', () => {
  let component: SettingvehicleComponent;
  let fixture: ComponentFixture<SettingvehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingvehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingvehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
