import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IWeapon } from '../../shared/interfaces/weapon.interface';

import { HeroDetailsService } from '../../heroes/providers/hero-details.service';
import { IHero } from '../../shared/interfaces/hero.interface';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss'],
})
export class EquipmentComponent implements OnInit, OnDestroy {
  hero: IHero;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private heroService: HeroDetailsService) {}

  onDeleted(weapon: IWeapon) {
    let index: number = this.hero.weapons.findIndex((el: IWeapon) => el === weapon);
    if (index > -1) {
      this.hero.weapons.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.heroService.getHero()
        .pipe(takeUntil(this.destroy$))
        .subscribe((hero: IHero) => this.hero = hero);
  }
}
