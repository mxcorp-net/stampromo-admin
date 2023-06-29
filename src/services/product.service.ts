import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Product} from '../app/_models/product';
import {Injectable} from '@angular/core';
import {CoreService} from './core.service';

@Injectable({
    providedIn: 'root'
})
export class ProductService implements CoreService {
    private prefix: string = '/products';

    constructor(private http: HttpClient) {
    }

    where(params: {}): Observable<Product[]> {
        return this.http.get<Product[]>(environment.api + this.prefix, {
            headers: {ServiceResource: 'WhereProducts'},
            params: params
        });
    }

    add(query: {}): Observable<Product> {
        return this.http.post<Product>(environment.api + this.prefix, query, {
            headers: {ServiceResource: 'NewProduct'},
        });
    }

    delete(query: {}): Observable<any> {
        return undefined;
    }

    find(id: number): Observable<Product> {
        return this.http.get<Product>(environment.api + '/products/' + id, {
            headers: {ServiceResource: 'ShowProduct'},
        });
    }

    update(query: {}): Observable<any> {
        return undefined;
    }
}
