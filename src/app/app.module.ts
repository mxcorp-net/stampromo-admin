// Angular Core
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {NgModule, Injectable} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

// Routing
import {AppRoutes} from './app.routing';
import {AppComponent} from './app.component';

// Layouts - Import required layout only
import {
    BlankComponent,
    RootLayout,
    SimplyWhiteLayout,
    BlankSimplywhiteComponent
} from './@pages/layouts';
// Layout Service - Required
import {pagesToggleService} from './@pages/services/toggler.service';

// Shared Layout Components
import {QuickviewComponent} from './@pages/components/quickview/quickview.component';
import {QuickviewService} from './@pages/components/quickview/quickview.service';
import {SearchOverlayComponent} from './@pages/components/search-overlay/search-overlay.component';
import {SharedModule} from './@pages/components/shared.module';
import {pgListViewModule} from './@pages/components/list-view/list-view.module';

//Basic Bootstrap Modules
import {
    TabsModule,
} from 'ngx-bootstrap/tabs';

// Third-party Components / Plugins - Optional
import {QuillModule} from 'ngx-quill';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ErrorInterceptor} from '../_helper/error.interceptor';
import {JwtInterceptor} from '../_helper/jwt.interceptor';
import {SidebarComponent} from './@pages/components/sidebar/sidebar.component';
import {HeaderComponent} from './@pages/components/header/header.component';
import {HorizontalMenuComponent} from './@pages/components/horizontal-menu/horizontal-menu.component';
import {MessageService} from './@pages/components/message/message.service';
import {MessageModule} from './@pages/components/message/message.module';
import { BreadcrumbComponent } from './_components/breadcrumb/breadcrumb.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

//Hammer Config Overide
//https://github.com/angular/angular/issues/10541
@Injectable()
export class AppHammerConfig extends HammerGestureConfig {
    overrides = <any>{
        'pinch': {enable: false},
        'rotate': {enable: false}
    };
}

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        SimplyWhiteLayout,
        SidebarComponent,
        QuickviewComponent,
        SearchOverlayComponent,
        HeaderComponent,
        HorizontalMenuComponent,
        BlankComponent,
        BlankSimplywhiteComponent,
        RootLayout,
        BreadcrumbComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        SharedModule,
        pgListViewModule,
        MessageModule,
        RouterModule.forRoot(AppRoutes, {relativeLinkResolution: 'legacy'}),
        TabsModule.forRoot(),
        PerfectScrollbarModule,
        QuillModule.forRoot()
    ],
    exports: [RouterModule],
    providers: [
        MessageService,
        QuickviewService,
        pagesToggleService, {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: AppHammerConfig
        },
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
