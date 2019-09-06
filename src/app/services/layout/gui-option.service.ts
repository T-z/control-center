import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuiOptionService {

  _menuLabelConfig: string;
  menuLabelSubject = new Subject<string>();

  _timerInput: number;
  timerInputSubject = new Subject<number>();

  _backgroundTons: string[];
  backgroundTonSubject = new Subject<string[]>();

  _timerBoolean: boolean;
  timerShowSubject = new Subject<boolean>();

  _configuration: any = {};

  constructor() {
    this.common_settings_initialise();
    this.function_init();
  }

  /**
   * Subject emit - Functions
   */
  emitMenuLabelConfigSubject() {
    this.menuLabelSubject.next(this._menuLabelConfig);
  }

  emitBackgroundTonSubject() {
    this.backgroundTonSubject.next(this._backgroundTons);
  }

  emitTimerInputSubject() {
    this.timerInputSubject.next(this._timerInput);
  }

  emitTimerShowSubject() {
    this.timerShowSubject.next(this._timerBoolean);
  }


  /**
   * general Functions
   */
  common_settings_initialise() {
    this._configuration = {
      timeOut_display: true,
      timeout: 10,
      menu_label: 'inline',
      projectBox: true,
      filterBox: false,
      vehicleBox: true,
      bgBar_ton: 'linear-gradient(180deg, #02386f 0%, #0b3f75 35%, #4472a2 100%)',
      bgAside_ton: 'linear-gradient(180deg, #8b9cb1 0%, #8b9cb1 35%, #eee 100%)'
    };
    // Menu-aside Display Setting
    this._menuLabelConfig = this._configuration['menu_label'];
  }

  function_init() {
    this._backgroundTons = [];
    this._backgroundTons.push(this._configuration['bgBar_ton']);
    this._backgroundTons.push(this._configuration['bgAside_ton']);

  }

  /**
   *  Setting-Panel Functions
   */

  changeTimeoutConfig(bool: boolean) {
    this._timerBoolean = bool;
    this.emitTimerShowSubject();
    this._configuration['timeOut_display'] = bool;
  }

  setTimeout(duration: number) {
    this._timerInput = duration;
    this.emitTimerInputSubject();
    this._configuration['timeout'] = duration;
  }

  getTimeout(): number {
    return this._configuration['timeout'];
  }

  getTimeoutConfig() {
    return this._configuration['timeOut_display'];
  }

  setBackgroundTon(ton1: string, ton2: string) {
    this._backgroundTons = [];
    this._backgroundTons.push(ton1);
    this._backgroundTons.push(ton2);
    this.emitBackgroundTonSubject();
    this._configuration['bgBar_ton'] = ton1;
    this._configuration['bgAside_ton'] = ton2;
  }

  setMenuWidthConfig(width_cfg) {
    const config = (width_cfg === 'default' ? 'inline' : 'none');
    this._menuLabelConfig = config;
    this.emitMenuLabelConfigSubject();
    this._configuration['menu_label'] = config;
  }

  changeBoxVisibility(key: string, bool: boolean) {
    this._configuration[key] = bool;
  }

  getBoxVisibility(boxKey: string) {
    return this._configuration[boxKey];
  }

}
