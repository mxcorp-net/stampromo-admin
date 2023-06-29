import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CatalogsRouting} from './catalogs.routing';
import {pgTabsModule} from '../@pages/components/tabs/tabs.module';
import {ProductListComponent} from './products/product-list/product-list.component';
import {ProductNewModalComponent} from './products/product-new-modal/product-new-modal.component';
import {ProductEditComponent} from './products/product-edit/product-edit.component';
import {FormsModule} from '@angular/forms';
import {DatatableModule} from '../_components/datatable/datatable.module';
import {SharedModule} from '../@pages/components/shared.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ModalModule} from 'ngx-bootstrap/modal';
import {ErrorInterceptor} from '../../_helper/error.interceptor';
import {JwtInterceptor} from '../../_helper/jwt.interceptor';
import {pgSelectModule} from '../@pages/components/select/select.module';
import {pgCardModule} from '../@pages/components/card/card.module';
import {ProgressModule} from '../@pages/components/progress/progress.module';
import { FamilyListComponent } from './families/family-list/family-list.component';
import { FamilyNewModalComponent } from './families/family-new-modal/family-new-modal.component';
import { FamilyEditComponent } from './families/family-edit/family-edit.component';
import { ColorListComponent } from './colors/color-list/color-list.component';
import { ProductShowComponent } from './products/product-show/product-show.component';
import {CollapseModule} from 'ngx-bootstrap/collapse';


@NgModule({
    declarations: [
        ProductListComponent,
        ProductNewModalComponent,
        ProductEditComponent,
        FamilyListComponent,
        FamilyNewModalComponent,
        FamilyEditComponent,
        ColorListComponent,
        ProductShowComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        pgTabsModule,
        pgSelectModule,
        DatatableModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forChild(CatalogsRouting),
        ModalModule.forRoot(),
        pgCardModule,
        ProgressModule,
        CollapseModule,
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ],
})
export class CatalogsModule {
}
