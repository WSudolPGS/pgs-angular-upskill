import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IHero } from '../../shared/interfaces/hero.interface';
import { IWeapon } from '../../shared/interfaces/weapon.interface';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment.detail.component.html',
  styleUrls: ['./equipment.detail.component.scss'],
})
export class EquipmentDetailComponent {
  @Input() weapon: IWeapon;
  @Input() hero: IHero;
  @Output() readonly weaponDeleted = new EventEmitter<IWeapon>();

  deleteWeapon(): void {
    this.weaponDeleted.emit(this.weapon);
  }
}
