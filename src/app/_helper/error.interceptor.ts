import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {AuthService} from '../auth/auth.service';
import {MessageService} from '../@pages/components/message/message.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authservice: AuthService, private _notification: MessageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((exception: HttpErrorResponse) => {
            const errorMessage = exception.error.error || 'UPS! something went wrong';
            if (exception.status === 401) {
                this.authservice.logout();
                location.reload(true);
            }
            if (exception.status === 500) {
                this._notification.create(
                    'danger',
                    errorMessage,
                    { // TODO give style to error notification
                        Position: 'top',
                        Style: 'bar',
                        Duration: 5000
                    }
                );
            }
            return throwError(errorMessage);
        }));
    }
}
