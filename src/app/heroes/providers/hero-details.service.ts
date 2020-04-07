import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IHero } from 'src/app/shared/interfaces/hero.interface';

@Injectable()
export class HeroDetailsService {
  private heroInstanceSubject: Subject<IHero> = new Subject<IHero>();

  getHero(): Observable<IHero> {
    return this.heroInstanceSubject;
  }

  setHero(data: IHero) {
    this.heroInstanceSubject.next(data);
  }
}