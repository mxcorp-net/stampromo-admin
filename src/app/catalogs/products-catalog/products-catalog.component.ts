import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableColumn, DatatableComponent, DatatableSettings, DatatableSource} from '../../_components/datatable/datatable.component';
import {ProductsService} from '../../services/products.service';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../_models/product';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {ProductsEditModalComponent} from './products-edit-modal/products-edit-modal.component';

@Component({
    selector: 'app-products-catalog',
    templateUrl: './products-catalog.component.html',
    styleUrls: ['./products-catalog.component.scss']
})
export class ProductsCatalogComponent implements OnInit {
    @ViewChild('ProductsDataTable', {static: false}) dataTable: DatatableComponent;

    productsService: ProductsService;
    dataSource: DatatableSource = <DatatableSource>{
        Limit: 50,
        Columns: [
            <DatatableColumn>{name: 'Id'},
            <DatatableColumn>{name: 'Name'},
            <DatatableColumn>{name: 'Description'}
        ]
    };
    dataSettings: DatatableSettings = <DatatableSettings>{
        ActiveSearch: true
    };
    private bsModalRef: BsModalRef;

    constructor(
        private http: HttpClient,
        private modalService: BsModalService
    ) {
        this.productsService = new ProductsService(http);
        this.dataSource.Service = this.productsService;
    }

    ngOnInit() {
    }

    editProduct(event: Product) {
        const initialState = {
            product: event
        };
        this.bsModalRef = this.modalService.show(ProductsEditModalComponent, {
            class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true,
            initialState
        });
    }


    newProduct(event: any) {
        this.bsModalRef = this.modalService.show(ProductsEditModalComponent, {
            class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true,
        });
    }
}
