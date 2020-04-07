import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { HeroDetailsService } from 'src/app/heroes/providers/hero-details.service';

import { HeroService } from '../../core/providers/hero/hero.service';
import { IHero } from '../../shared/interfaces/hero.interface';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: IHero;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private heroDetailsService: HeroDetailsService,
  ) {}

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService
      .updateHero$(this.hero)
      .subscribe(() => this.goBack());
  }

  ngOnInit(): void {
    this.setHero();
  }

  private setHero(): void {
     this.activatedRoute.params.pipe(switchMap((params: Params) =>
          this.heroService.getHero$(params.id).pipe(tap((hero: IHero) => this.heroDetailsService.setHero(hero)),
      ))).subscribe((hero: IHero) => this.hero = hero);
  }
}
