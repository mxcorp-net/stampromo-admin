import {Injectable} from '@angular/core';
import {CoreService} from './core.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Provider} from '../app/_models/provider';

@Injectable({
    providedIn: 'root'
})
export class ProvidersService implements CoreService {
    add(query: {}): Observable<any> {
        return undefined;
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

    where(params: {}): Observable<Provider[]> {
        return this.http.get<Provider[]>(environment.api + '/providers', {
            headers: {ServiceResource: 'WhereProviders'},
            params: params
        });
    }

    constructor(private http: HttpClient) {
    }
}
