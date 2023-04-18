import {Component} from '@angular/core';
import {User} from './_models/user';
import {AuthService} from './auth/auth.service';

@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Stampromo Admin';
    currentUser: User;

    constructor(
        private authService: AuthService
    ) {
        this.authService.currentUser.subscribe(x => this.currentUser = x);
    }
}
