import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import * as ROUTING_PATHS from './shared/constants/routing-paths.constants';

const routes: Routes = [
  { path: '', redirectTo: ROUTING_PATHS.DOSHBOARD_REDIRECT, pathMatch: 'full' },
  { path: ROUTING_PATHS.DOSHBOARD_ROOT, component: DashboardComponent },
  { path: ROUTING_PATHS.HEROES_ROOT, loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule), data: { preload: true } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
