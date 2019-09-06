import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const AppRoutes: Routes = [{
  path: 'login',
  loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)
}, {
  path: 'reset/:token',
  loadChildren: () => import('./components/reset/reset.module').then(m => m.ResetModule)
}, {
  path: '',
  loadChildren: () => import('./components/stibs/stibs.module').then(m => m.StibsModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
