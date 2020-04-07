import { Component, OnInit } from '@angular/core';

import { HeroService } from '../../core/providers/hero/hero.service';
import * as ROUTING_PATHS from '../../shared/constants/routing-paths.constants';
import { IHero } from '../../shared/interfaces/hero.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  readonly routingPaths = ROUTING_PATHS;
  heroes: IHero[] = [];
  private readonly numberOfHeroesToShow: number = 5;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.setHeroes();
  }

  private setHeroes(): void {
    this.heroService
      .getHeroes$()
      .subscribe((heroes: IHero[]) => this.heroes = heroes.slice(0, this.numberOfHeroesToShow));
  }
}
