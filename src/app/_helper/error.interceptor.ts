import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {AuthService} from '../auth/auth.service';
import {MessageService} from '../@pages/components/message/message.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    errorOptions: {
        Position: 'top',
        Style: 'bar',
        Duration: 5000
    };

    constructor(
        private authService: AuthService,
        private _notification: MessageService
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((exception: HttpErrorResponse) => {
            const errorMessage = exception.error.error || 'UPS! something went wrong (interceptor)';
            if (exception.status === 401) {
                this.authService.logout();
                // TODO: add current URL to redirect back after login
                location.href = '/auth/login';
            }
            // if (exception.status === 400) {
            //     this._notification.warning(errorMessage, this.errorOptions);
            // }
            if (exception.status === 500) {
                this._notification.error(errorMessage, this.errorOptions);
            }
            return throwError(errorMessage);
        }));
    }
}
