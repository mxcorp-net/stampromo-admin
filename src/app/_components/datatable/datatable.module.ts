import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatatableComponent} from './datatable.component';
import {FormsModule} from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchComponent } from './search/search.component';
import {pgCardModule} from '../../@pages/components/card/card.module';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

@NgModule({
    declarations: [DatatableComponent, PaginationComponent, SearchComponent],
    exports: [DatatableComponent],
    imports: [
        CommonModule,
        FormsModule,
        pgCardModule,
        BsDropdownModule,
    ],
    providers: []
})
export class DatatableModule {
}
