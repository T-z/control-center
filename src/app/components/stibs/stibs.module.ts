import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StibsRoutingModule } from './stibs-routing.module';
import { StibsComponent } from './stibs.component';

import { MatSidenavModule } from '@angular/material/sidenav';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatPaginatorIntl
} from '@angular/material';
import { ImportComponent } from './components/import/import.component';
import { UserAdministrationComponent } from './components/user-administration/user-administration.component';
import { DeficienciesComponent } from './components/deficiencies/deficiencies.component';
import { ArchivalComponent } from './components/archival/archival.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from '../../services/auth-guard.service';
import { ChartsModule } from 'ng2-charts';
import { UserComponent } from './dialog/user-dialog/user-dialog.component';
import { AdjustmentComponent } from './components/adjustment/adjustment.component';
import { ReportManagementComponent } from './components/report-management/report-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingvehicleComponent } from './dialog/settingvehicle/settingvehicle.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddsollvalueComponent } from './components/snackbar/addsollvalue/addsollvalue.component';
import { EditsollvalueComponent } from './components/snackbar/editsollvalue/editsollvalue.component';
import { DeletesollvalueComponent } from './components/snackbar/deletesollvalue/deletesollvalue.component';
import { SnackedituserComponent } from './components/snackbar/snackedituser/snackedituser.component';
import { SnackadduserComponent } from './components/snackbar/snackadduser/snackadduser.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { SnackdeleteuserComponent } from './components/snackbar/snackdeleteuser/snackdeleteuser.component';
import { TestUnitComponent } from './components/test-unit/test-unit.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SettingdateComponent } from './dialog/settingdate/settingdate.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ConfigComponent } from './components/config/config.component';
import { SnackaddvehicleComponent } from './components/snackbar/snackaddvehicle/snackaddvehicle.component';
import { EquipmentsComponent } from './components/equipments/equipments.component';
import { SnacksyncComponent } from './components/snackbar/snacksync/snacksync.component';
import { SnackarchivComponent } from './components/snackbar/snackarchiv/snackarchiv.component';
import { AssignprojectComponent } from './dialog/assignproject/assignproject.component';
import { BarHorizontalChartComponent } from './components/bar-horizontal-chart/bar-horizontal-chart.component';
import { SnackGeneralComponent } from './components/snackbar/snack-general/snack-general.component';
import { EquipmentDialogComponent } from './dialog/equipment-dialog/equipment-dialog.component';
import { VehicleDialogComponent } from './dialog/vehicle-dialog/vehicle-dialog.component';
import { FileValueAccessorDirective } from 'src/app/utils/file-control.directive';
import { MatPaginatorI18nService } from 'src/app/utils/material-intl';
import { ChartCanvasI18nService } from '../../utils/chart-canvas-intl';

@NgModule({
  imports: [
    CommonModule,
    StibsRoutingModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTooltipModule,
    ChartsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatSortModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    LayoutModule,
    MatTabsModule,
    MatProgressBarModule
  ],
  declarations: [
    StibsComponent,
    ImportComponent,
    UserAdministrationComponent,
    DeficienciesComponent,
    ArchivalComponent,
    DashboardComponent,
    UserComponent,
    AdjustmentComponent,
    ReportManagementComponent,
    SettingvehicleComponent,
    AddsollvalueComponent,
    EditsollvalueComponent,
    DeletesollvalueComponent,
    SnackedituserComponent,
    SnackadduserComponent,
    PieChartComponent,
    BarChartComponent,
    LineChartComponent,
    SnackdeleteuserComponent,
    TestUnitComponent,
    SettingdateComponent,
    CommentsComponent,
    ConfigComponent,
    SnackaddvehicleComponent,
    EquipmentsComponent,
    SnacksyncComponent,
    SnackarchivComponent,
    SnackGeneralComponent,
    AssignprojectComponent,
    BarHorizontalChartComponent,
    EquipmentDialogComponent,
    VehicleDialogComponent,
    FileValueAccessorDirective
  ],
  providers: [
    AuthGuardService,
    ChartCanvasI18nService,
    { provide: MatPaginatorIntl, useClass: MatPaginatorI18nService, deps: [LOCALE_ID] }
  ],
  entryComponents: [
    UserComponent,
    SettingvehicleComponent,
    DeletesollvalueComponent,
    EditsollvalueComponent,
    EquipmentDialogComponent,
    AddsollvalueComponent,
    SnackadduserComponent,
    SnackedituserComponent,
    SnackdeleteuserComponent,
    SnackGeneralComponent,
    SettingdateComponent,
    VehicleDialogComponent,
    SnackaddvehicleComponent,
    SnacksyncComponent,
    SnackarchivComponent,
    AssignprojectComponent
  ]
})
export class StibsModule {

}
