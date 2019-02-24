import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/**
 * Http 서비스이다.
 */
export class HttpService {
  /**
   * 서버 주소
   */
  serverEndpoint:string = 'http://localhost:5656';

  /**
   * http 옵션이다.
   */
  httpOptions: object = {
    headers: new HttpHeaders ({
      'Content-Type':  'application/json'
    })
  };

  /**
   * 생성자 이다.
   * 
   * @param http HttpClient 이다.
   */
  constructor(private http: HttpClient) { 
    
  }

  /**
   * 응답값을 추출한다.
   * 
   * @param res 응답
   */
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  
  /**
   * 자원을 단건 요청한다.
   * 
   * @param uri 요청 uri
   */
  get(uri: string): Observable<any> {
    const getUrl = `${this.serverEndpoint}/${uri}`;
    return this.http.get(getUrl).pipe(
      map(this.extractData));
  }
  
  // **************************************************** TODO 로직 및 주석 수정) ****************************************************
  getList(id): Observable<any> {
    return this.http.get(this.serverEndpoint + 'products/' + id).pipe(
      map(this.extractData));
  }
  
  create (product): Observable<any> {
    console.log(product);
    return this.http.post<any>(this.serverEndpoint + 'products', JSON.stringify(product), this.httpOptions).pipe(
      tap((product) => console.log(`added product w/ id=${product.id}`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }
  
  update (id, product): Observable<any> {
    return this.http.put(this.serverEndpoint + 'products/' + id, JSON.stringify(product), this.httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }
  
  delete (id): Observable<any> {
    return this.http.delete<any>(this.serverEndpoint + 'products/' + id, this.httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }
  // **************************************************** TODO 로직 및 주석 수정) ****************************************************

  /**
   * 핸들 에러를 처리한다.
   * 
   * @param operation 연산자
   * @param result 결과
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      // log to console instead
      console.error(error); 
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
