import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor,
    HttpErrorResponse, HttpEvent
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {tap} from 'rxjs/operators';
import {MessageService} from '../app/@pages/components/message/message.service';
import {MessageDataOptions} from '../app/@pages/components/message/message.definitions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    errorOptions: MessageDataOptions = {
        Position: 'top',
        Style: 'bar',
        imgURL: 'assets/img/profiles/avatar.jpg',
        Duration: 5000,
        PauseOnHover: true,
    };

    constructor(
        private authService: AuthService,
        private _notification: MessageService
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req);
        return next.handle(req).pipe(
            tap({
                error: (exception: HttpErrorResponse) => {
                    const errorMessage = exception.message || 'UPS! Something went wrong.';
                    switch (exception.status) {
                        // case 400:
                        //     this._notification.error('One or more fields are incorrect or do not meet the constraints', this.errorOptions);
                        //     break;
                        case 401:
                            this.authService.logout();
                            break;
                        case 404:
                            this._notification.warning('The path or resource [ ' + req.headers.get('ServiceResource') + ' ] was not found.', this.errorOptions);
                            break;
                        case 500:
                            this._notification.error(errorMessage, this.errorOptions);
                            break;
                    }
                    return throwError(exception);
                },
                next: () => null
            })
        );
    }
}
