import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IHero } from '../../../shared/interfaces/hero.interface';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private readonly heroesUrl: string = 'api/heroes';  // URL to web api

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService,
  ) {}

  /**
   * GET heroes from the server
   * @returns Observable with the list of heroes
   **/
  getHeroes$(): Observable<IHero[]> {
    return this.httpClient
      .get<IHero[]>(this.heroesUrl)
      .pipe(
        tap(() => this.log('fetched heroes')),
        catchError(this.handleError$<IHero[]>('getHeroes', [])),
      );
  }

  /**
   * GET hero by id
   * @param heroId Id of the fetched hero
   * @returns Observable with hero details or undefined if the hero with the id doesnt exist
   **/
  getHeroNo404$(heroId: string): Observable<IHero> {
    const url: string = `${this.heroesUrl}/?id=${heroId}`;

    return this.httpClient
      .get<IHero[]>(url)
      .pipe(
        map((heroes: IHero[]) => heroes[0]), // returns a {0|1} element array
        tap((hero: IHero | undefined) => {
          const outcome: string = hero ? `fetched` : `did not find`;

          this.log(`${outcome} hero id=${heroId}`);
        }),
        catchError(this.handleError$<IHero>(`getHero id=${heroId}`)),
      );
  }

  /**
   * GET hero by id
   * @param heroId Id of the fetched hero
   * @returns Observable with hero details or throw 404 error if hero with the id doesnt exist
   **/
  getHero$(heroId: string): Observable<IHero> {
    const url: string = `${this.heroesUrl}/${heroId}`;

    return this.httpClient
      .get<IHero>(url)
      .pipe(
        tap(() => this.log(`fetched hero id=${heroId}`)),
        catchError(this.handleError$<IHero>(`getHero id=${heroId}`)),
      );
  }

  /* GET heroes whose name contains search term */
  searchHeroes$(term: string): Observable<IHero[]> {
    if(!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }

    return this.httpClient
      .get<IHero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(() => this.log(`found heroes matching "${term}"`)),
        catchError(this.handleError$<IHero[]>('searchHeroes', [])),
      );
  }

  /**
   * POST: add a new hero to the server
   * @param hero Name of the hero that needs to be added
   * @returns Add hero request observable
   **/
  addHero$ (hero: IHero): Observable<IHero> {
    return this.httpClient
      .post<IHero>(this.heroesUrl, hero)
      .pipe(
        tap((newHero: IHero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError$<IHero>('addHero')),
      );
  }

  /**
   * DELETE: delete the hero from the server
   * @param hero Hero that needs to be deleted
   * @returns Delete hero request observable
   **/
  deleteHero$ (hero: IHero | string): Observable<IHero> {
    const heroId: string = typeof hero === 'string' ? hero : hero.id;
    const url: string = `${this.heroesUrl}/${heroId}`;

    return this.httpClient
      .delete<IHero>(url)
      .pipe(
        tap(() => this.log(`deleted hero id=${heroId}`)),
        catchError(this.handleError$<IHero>('deleteHero')),
      );
  }

  /**
   *  PUT: update the hero on the server
   * @param hero Hero that needs to be updated
   * @returns Update hero request observable
   **/
  updateHero$ (hero: IHero): Observable<IHero> {
    return this.httpClient
      .put<IHero>(this.heroesUrl, hero)
      .pipe(
        tap(() => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError$<IHero>('updateHero')),
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   * @returns Observable with proper interface and error handled
   */
  private handleError$<T> (operation: string, result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   *  Log a HeroService message with the MessageService
   *  @param message Message to be showed
   **/
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
