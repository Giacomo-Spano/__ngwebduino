import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Webduinosystem } from './webduinosystem';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

/** PUT: update the hero on the server */
export class WebduinosystemService {

   //private webduinosystemsUrl = 'http://giacomohome.ddns.net:9090/webduino/system?requestcommand=webduinosystems';
   //private webduinosystemUrl = 'http://giacomohome.ddns.net:9090/webduino/system?requestcommand=webduinosystem&id=';
   private webduinosystemUrl = 'http://giacomohome.ddns.net:9090/webduino/system';

   constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    /** GET webduinosystems from the server */
    getWebduinosystems (): Observable<Webduinosystem[]> {
      return this.http.get<Webduinosystem[]>(this.webduinosystemUrl + '?requestcommand=webduinosystems')
        .pipe(
          tap(webduinosystems => this.log('fetched webduinosystems')),
          catchError(this.handleError('getWebduinosystems', []))
        );
    }

   

   /** GET webduinosystem by id. Will 404 if id not found */
  getWebduinosystem(id: number): Observable<Webduinosystem> {
    const url = `${this.webduinosystemUrl}` + '?requestcommand=webduinosystem&id=' + `${id}`;
    return this.http.get<Webduinosystem>(url).pipe(
      tap(_ => this.log(`fetched webduinosystem id=${id}`)),
      catchError(this.handleError<Webduinosystem>(`getWebduinosystem id=${id}`))
    );
  }

  updateWebduinosystem(webduinosystem: Webduinosystem): Observable<any> {
    const url = this.webduinosystemUrl + '?data=webduinosystem';

    
    //return this.http.post(url, webduinosystem, options)
    return this.http.post(url, webduinosystem, httpOptions)
    .pipe(
       tap(_ => this.log(`updated webduinosystem id=${webduinosystem.id}`)),
       catchError(this.handleError<any>('updateWebduinosystem'))
     );
   }
  /** POST: add a new hero to the server */
  addWebduinosystem (webduinosystem: Webduinosystem): Observable<Webduinosystem> {
    return this.http.post<Webduinosystem>(this.webduinosystemUrl, webduinosystem, httpOptions).pipe(
      tap((hero: Webduinosystem) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Webduinosystem>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteWebduinosystem (webduinosystem: Webduinosystem | number): Observable<Webduinosystem> {
    const id = typeof webduinosystem === 'number' ? webduinosystem : webduinosystem.id;
    const url = `${this.webduinosystemUrl}/${id}`;

    return this.http.delete<Webduinosystem>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted webduinosystem id=${id}`)),
      catchError(this.handleError<Webduinosystem>('deleteWebduinosystem'))
    );
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`WebduinoserviceService: ${message}`);
  }

}
