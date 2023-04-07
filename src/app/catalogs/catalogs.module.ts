import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CatalogsRoute} from './catalogs.routing';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../@pages/components/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ErrorInterceptor} from '../_helper/error.interceptor';
import {JwtInterceptor} from '../_helper/jwt.interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatatableModule} from '../_components/datatable/datatable.module';
// Catalogs Components
import {ProductsCatalogComponent} from './products-catalog/products-catalog.component';
import {TagsCatalogComponent} from './tags-catalog/tags-catalog.component';
import {CategoriesCatalogComponent} from './categories-catalog/categories-catalog.component';
import {ServicesCatalogComponent} from './services-catalog/services-catalog.component';
import {ProvidersCatalogComponent} from './providers-catalog/providers-catalog.component';
import {FamiliesCatalogComponent} from './families-catalog/families-catalog.component';
import {ColorsCatalogComponent} from './colors-catalog/colors-catalog.component';
import {ProductsEditModalComponent} from './products-catalog/products-edit-modal/products-edit-modal.component';
import {ModalModule} from 'ngx-bootstrap';
import {pgSelectModule} from '../@pages/components/select/select.module';
import {ColorsEditModalComponent} from './colors-catalog/colors-edit-modal/colors-edit-modal.component';
import {FamiliesEditModalComponent} from './families-catalog/families-edit-modal/families-edit-modal.component';
import {pgTabsModule} from '../@pages/components/tabs/tabs.module';
import { TagEditModalComponent } from './tags-catalog/tag-edit-modal/tag-edit-modal.component';

@NgModule({
    declarations: [
        ProductsCatalogComponent,
        TagsCatalogComponent,
        CategoriesCatalogComponent,
        ServicesCatalogComponent,
        ProvidersCatalogComponent,
        FamiliesCatalogComponent,
        ColorsCatalogComponent,
        ProductsEditModalComponent,
        ColorsEditModalComponent,
        FamiliesEditModalComponent,
        TagEditModalComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        HttpClientModule,
        RouterModule.forChild(CatalogsRoute),
        NgxDatatableModule,
        FormsModule,
        DatatableModule,
        ModalModule,
        pgSelectModule,
        pgTabsModule,
        ReactiveFormsModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ],
    entryComponents: [
        ProductsEditModalComponent,
        ColorsEditModalComponent,
        FamiliesEditModalComponent,
        TagEditModalComponent
    ]
})
export class CatalogsModule {
}
