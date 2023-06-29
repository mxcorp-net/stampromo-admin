import {Observable} from 'rxjs';

export interface CoreService {

  where(query: {}): Observable<any>; // TODO: check exclude words

  add(query: {}): Observable<any>;

  update(query: {}): Observable<any>;

  find(query: {}): Observable<any>; // TODO: check parameters

  delete(query: {}): Observable<any>;
}
