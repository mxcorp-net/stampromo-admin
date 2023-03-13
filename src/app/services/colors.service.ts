import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Color} from '../_models/color';
import {environment} from '../../environments/environment';
import {CoreService} from './core.service';

@Injectable({
    providedIn: 'root'
})
export class ColorsService implements CoreService {

    constructor(private http: HttpClient) {
    }

    where(query: {}): Observable<Color[]> {
        return this.http.post<Color[]>(environment.api + '/colors/where', query);
    }

    add(query: {}): Observable<Color> {
        return this.http.post<Color>(environment.api + '/colors/new', query);
    }

    delete(query: {}): Observable<any> {
        return undefined;
    }

    find(query: {}): Observable<any> {
        return undefined;
    }

    update(query: {}): Observable<Color> {
        return  undefined;
    }
}
