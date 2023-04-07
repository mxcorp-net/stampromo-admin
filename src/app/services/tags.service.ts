import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tag} from '../_models/tag';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) {
  }

  where(query: {}): Observable<Tag[]> {
    return this.http.post<Tag[]>(environment.api + '/tags/where', query);
  }

  add(query: {}): Observable<Tag> {
    return this.http.post<Tag>(environment.api + '/tags/new', query);
  }

  delete(query: {}): Observable<any> {
    return undefined;
  }

  find(query: {}): Observable<any> {
    return undefined;
  }

  update(query: {}): Observable<any> {
    return undefined;
  }
}
