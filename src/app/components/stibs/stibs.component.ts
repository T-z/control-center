import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user_authentification/user-auth.service';
import { SharedService } from '../../services/shared.service';
import { IdleService } from 'src/app/services/idle.service';
import { version } from 'src/version';
import { IProject } from '@stibs/api';

@Component({
  selector: 'app-stibs',
  templateUrl: './stibs.component.html',
  styleUrls: ['./stibs.component.scss']
})
export class StibsComponent implements OnInit {

  constructor(public userAuth: UserAuthService, private idleService: IdleService, private sharedService: SharedService) {

  }

  ngOnInit() {

  }

  invalidate() {
    this.userAuth.invalidate();
  }

  idleState(): number {
    return this.idleService.state();
  }

  currentProject(): IProject {
    return this.sharedService.currentProject;
  }

  isDarkTheme(): boolean {
    return this.sharedService.darkTheme;
  }

  showIdle(): boolean {
    return this.sharedService.showIdle;
  }

  setLanguage(locale: string) {
    if (this.sharedService.currentLocale != locale) {

      // we are running below a language identifier /xx/...
      if (/^\/\w{2}\//.test(window.location.pathname)) {
        window.location.pathname = `/${locale}${window.location.pathname.slice(3)}`;
      } else {
        window.location.pathname = `/${locale}${window.location.pathname}`;
      }

    }
  }

  isCurrentLocale(locale: string): boolean {
    return this.sharedService.currentLocale === locale;
  }

  frontendVersion(): string {
    return version;
  }

  backendVersion(): string {
    return this.sharedService.currentMeta ? this.sharedService.currentMeta.version : '';
  }
}
