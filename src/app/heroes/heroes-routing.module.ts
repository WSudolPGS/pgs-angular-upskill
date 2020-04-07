import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroDetailComponent } from '../pages/hero-detail/hero-detail.component';
import { HeroesComponent } from '../pages/heroes/heroes.component';
import * as ROUTING_PATHS from '../shared/constants/routing-paths.constants';

const routes: Routes = [
  { path: '', component: HeroesComponent, children: [
    { path: ROUTING_PATHS.HEROES_ID, component: HeroDetailComponent },
    { path: ROUTING_PATHS.HEROES_ID_EQUIPMENT, component: HeroDetailComponent,
      loadChildren: () => import('../equipment/equipment.module').then((m) => m.EquipmentModule) },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule { }
