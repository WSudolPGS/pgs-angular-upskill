import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap,
 } from 'rxjs/operators';

import { HeroService } from '../../core/providers/hero/hero.service';
import { DEFAULT_DEBOUNCE_TIME } from '../../shared/constants/default-debounce-time.constants';
import { IHero } from '../../shared/interfaces/hero.interface';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<IHero[]>;
  private searchTerm$: Subject<string> = new Subject();

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerm$.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerm$.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(DEFAULT_DEBOUNCE_TIME),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes$(term)),
    );
  }
}
