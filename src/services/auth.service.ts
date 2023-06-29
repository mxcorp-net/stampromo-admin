import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../app/_models/user';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('stampromo.user')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${environment.api}/auth/login`, {email: email, password: password})
            .pipe(map(response => {
                localStorage.setItem('stampromo.user', JSON.stringify(response));
                this.currentUserSubject.next(response);
                return response;
            }));
    }

    logout() {
        localStorage.removeItem('stampromo.user');
        this.currentUserSubject.next(null);

        location.href = '/auth/login';
    }
}
