import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UserAuthService } from './services/user_authentification/user-auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ProjectService } from './services/backendApi/project.service';
import { UserService } from './services/backendApi/user.service';
import { NodeBackupService } from './services/backendApi/node-backup.service';
import { CommentService } from './services/backendApi/comment.service';
import { DefectService } from './services/backendApi/defect.service';
import { EquipmentService } from './services/backendApi/equipment.service';
import { NodeMetaService } from './services/backendApi/node-meta.service';
import { GuiOptionService } from './services/layout/gui-option.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SharedService } from './services/shared.service';
import { environment } from '../environments/environment';
import { IdleService } from './services/idle.service';

import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';

registerLocaleData(localeDE);

const CurrentLocale = () => {

  if (new RegExp('^/en/').test(window.location.pathname)) {
    return 'en';
  }

  return 'de';

}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: LOCALE_ID, useFactory: CurrentLocale },
    UserAuthService,
    AuthGuardService,
    ProjectService,
    UserService,
    NodeMetaService,
    NodeBackupService,
    CommentService,
    DefectService,
    EquipmentService,
    GuiOptionService,
    SharedService,
    IdleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
