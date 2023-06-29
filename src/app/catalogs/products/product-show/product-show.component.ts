import {Component, OnInit} from '@angular/core';
import {Product} from '../../../_models/product';
import {ProductService} from '../../../../services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-product-show',
    templateUrl: './product-show.component.html',
    styleUrls: ['./product-show.component.scss']
})
export class ProductShowComponent implements OnInit {
    product: Product = new Product();
    selectedPrice: number = 0.01;

    constructor(
        private actRoute: ActivatedRoute,
        private productService: ProductService
    ) {
        this.product.id = Number.parseInt(this.actRoute.snapshot.params['id']);
    }

    ngOnInit(): void {
        this.productService.find(this.product.id).subscribe(data => {
            this.product = data;
        });
    }

    selectRating($event: MouseEvent) {
        console.log($event.target['attributes']['data-value'].value);
    }
}
