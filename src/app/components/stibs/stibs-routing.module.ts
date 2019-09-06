import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StibsComponent } from './stibs.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeficienciesComponent } from './components/deficiencies/deficiencies.component';
import { UserAdministrationComponent } from './components/user-administration/user-administration.component';
import { ReportManagementComponent } from './components/report-management/report-management.component';
import { AdjustmentComponent } from './components/adjustment/adjustment.component';
import { EquipmentsComponent } from './components/equipments/equipments.component';
import { TestUnitComponent } from './components/test-unit/test-unit.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ConfigComponent } from './components/config/config.component';
import { AuthGuardService } from '../../services/auth-guard.service';

const StibsRoutes: Routes = [{
  path: '',
  component: StibsComponent,
  canActivate: [AuthGuardService],
  children: [{
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path: 'deficiencies',
    component: DeficienciesComponent
  }, {
    path: 'user-administration',
    component: UserAdministrationComponent
  }, {
    path: 'comments',
    component: CommentsComponent
  }, {
    path: 'settings',
    component: AdjustmentComponent
  }, {
    path: 'option-report',
    component: ReportManagementComponent
  }, {
    path: 'test-unit',
    component: TestUnitComponent
  }, {
    path: 'equipments',
    component: EquipmentsComponent
  }, {
    path: 'config',
    component: ConfigComponent
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(StibsRoutes)],
  exports: [RouterModule]
})
export class StibsRoutingModule { }
