import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ProductService} from '../../../../services/product.service';
import {Product} from '../../../_models/product';
import {DatatableColumn, DatatableComponent, DatatableSettings, DatatableSource} from '../../../_components/datatable/datatable.component';
import {ProductNewModalComponent} from '../product-new-modal/product-new-modal.component';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    @ViewChild('ProductsDataTable', {static: true}) productsTable: DatatableComponent;

    productsService: ProductService;
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

    constructor(
        private router: Router,
        private http: HttpClient,
        private modalService: BsModalService
    ) {
        this.dataSource.Service = this.productsService = new ProductService(http);
    }

    ngOnInit(): void {
    }

    showProduct(event: Product) {
        this.router.navigate(['/catalogs/products/' + event.id]);
    }

    newProduct($event: any) {
        const modal = this.modalService.show(ProductNewModalComponent, {
            class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true,
        });

        (<ProductNewModalComponent>modal.content).onClose.subscribe(result => {
            if (result === true) {
                this.productsTable.reloadTable();
            }
        });
    }
}
