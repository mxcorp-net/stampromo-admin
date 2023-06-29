import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../@pages/components/shared.module';
import {RouterModule} from '@angular/router';
import {AuthRoute} from './auth.routing';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
    declarations: [
    AuthLoginComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        HttpClientModule,
        RouterModule.forChild(AuthRoute)
    ],
    providers: []
})
export class AuthModule {
}
