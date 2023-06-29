import {Component, OnInit} from '@angular/core';
import {Product} from '../../../_models/product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../../services/product.service';
import {Provider} from '../../../_models/provider';
import {Family} from '../../../_models/family';
import {FamiliesService} from '../../../../services/families.service';
import {ProvidersService} from '../../../../services/providers.service';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
    product: Product = new Product();
    isLoading: boolean = false;

    errorMessageDetails: string = '';
    showMessageDetails: boolean = false;
    errorMessageChildren: string = '';
    showMessageChildren: boolean = false;
    providers: Provider[];
    families: Family[];

    constructor(
        private actRoute: ActivatedRoute,
        private productService: ProductService,
        private familyService: FamiliesService,
        private providerService: ProvidersService,
    ) {
        this.isLoading = true;
        this.product.id = Number.parseInt(this.actRoute.snapshot.params['id']);
    }

    ngOnInit(): void {
        this.familyService.where({words: JSON.stringify(['*'])}).subscribe(data => {
            this.families = data;
        });
        this.providerService.where({words: JSON.stringify(['*'])}).subscribe(data => {
            this.providers = data;
        });

        this.productService.find(this.product.id).subscribe(data => {
            this.product = data;
            this.isLoading = false;
        });
    }

}
