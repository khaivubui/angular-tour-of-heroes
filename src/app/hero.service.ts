import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  getHeroes(): Observable<Hero[]> {
    return this.http
               .get<Hero[]>(this.heroesUrl)
               .pipe(
                 tap(heroes => this.log('fetched heroes')),
                 catchError(this.handleError('getHeroes', []))
                );
  }

  getHero(id: number): Observable<Hero> {
    this.log(`HeroService: fetched hero with id ${id}`);
    return of({id: 1, name: 'Khai'});
  }

  private log(message: string) {
    this.messageService.add(message);
  }

  private handleError<T> (operation = 'operation', result: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
