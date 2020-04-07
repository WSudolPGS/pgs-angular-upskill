import { NgModule } from '@angular/core';

import { EquipmentDetailComponent } from '../pages/equipment-detail/equipment.detail.component';
import { EquipmentComponent } from '../pages/equipment/equipment.component';
import { SharedModule } from '../shared/shared.module';

import { EquipmentRoutingModule } from './equipment-routing.module';

@NgModule({
  declarations: [EquipmentComponent,
    EquipmentDetailComponent],
  imports: [
    SharedModule,
    EquipmentRoutingModule,
  ],
})
export class EquipmentModule { }
