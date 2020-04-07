import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { HeroService } from '../../core/providers/hero/hero.service';
import * as ROUTING_PATHS from '../../shared/constants/routing-paths.constants';
import { IHero } from '../../shared/interfaces/hero.interface';
import { HeroAddComponent } from '../hero-add/hero-add.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  readonly routingPaths = ROUTING_PATHS;
  heroes: IHero[];

  constructor(private heroService: HeroService, public addDialog: MatDialog) { }

  add(name: string): void {
    const nameTrimmed: string = name.trim();

    if(!nameTrimmed) { return; }

    const addDialogRef: MatDialogRef<HeroAddComponent> = this.addDialog.open(HeroAddComponent, {data:{ name } });

    addDialogRef.afterClosed().subscribe((data: IHero | undefined) => {
      if (data) {
        this.heroService
        .addHero$(data)
        .subscribe((hero: IHero) => this.heroes.push(hero));
      }});
  }

  delete(hero: IHero): void {
    this.heroService
      .deleteHero$(hero)
      .subscribe(() => {
        this.heroes = this.heroes.filter((heroIteration: IHero) => heroIteration !== hero);
      });
  }

  ngOnInit() {
    this.setHeroes();
  }

  private setHeroes(): void {
    this.heroService
      .getHeroes$()
      .subscribe((heroes: IHero[]) => this.heroes = heroes);
  }
}
