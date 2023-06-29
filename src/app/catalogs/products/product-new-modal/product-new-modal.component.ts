import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Product} from '../../../_models/product';
import {Provider} from '../../../_models/provider';
import {Family} from '../../../_models/family';
import {FamiliesService} from '../../../../services/families.service';
import {ProvidersService} from '../../../../services/providers.service';
import {MessageService} from '../../../@pages/components/message/message.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ProductService} from '../../../../services/product.service';
import {MessageDataOptions} from '../../../@pages/components/message/message.definitions';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
    selector: 'app-product-new-modal',
    templateUrl: './product-new-modal.component.html',
    styleUrls: ['./product-new-modal.component.scss'],
    animations: [
        trigger('fadeAnimation', [
            state(
                'false',
                style({
                    opacity: '0',
                    visibility: 'hidden'
                })
            ),
            state(
                'true',
                style({
                    opacity: '1',
                    visibility: 'visible'
                })
            ),
            transition('false => true', animate('500ms ease-in')),
            transition('true => false', animate('500ms ease-out'))
        ])
    ]
})
export class ProductNewModalComponent implements OnInit {
    product: Product = new Product();
    public onClose: Subject<boolean> = new Subject<boolean>();
    public title: string = 'New Product';

    selectedProvider: any = null;
    providers: Provider[];

    selectedFamily: any = null;
    families: Family[];

    isLoading: boolean = false;
    errorOptions: MessageDataOptions = {
        Position: 'top',
        Style: 'bar',
        imgURL: 'assets/img/profiles/avatar.jpg',
        Duration: 5000,
        PauseOnHover: true,
    };

    constructor(
        public bsModalRef: BsModalRef,
        private famService: FamiliesService,
        private proService: ProvidersService,
        private productService: ProductService,
        private _notification: MessageService,
        private route: Router
    ) {
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.famService.where({words: JSON.stringify(['*'])}).subscribe(
            data => {
                this.families = data;
            },
            error => {
                this.bsModalRef.hide();
            },
            () => {
                this.isLoading = false;
            }
        );
        this.proService.where({words: JSON.stringify(['*'])}).subscribe(
            data => {
                this.providers = data;
            },
            error => {
                this.bsModalRef.hide();
            },
            () => {
                this.isLoading = false;
            }
        );
    }

    createProduct(edit: boolean = false) {
        this.isLoading = true;
        this.product.provider_id = this.selectedProvider;
        this.product.family_id = this.selectedFamily;

        this.productService.add(this.product).subscribe(
            data => {
                this.product = data
                this.isLoading = false;
                this._notification.success('Product [ ' + this.product.name + ' ] was created successfully!!', this.errorOptions);
                if (edit) {
                    this.route.navigate([`/catalogs/products/${this.product.id}/edit`]);
                } else {
                    this.onClose.next(true);
                }
            },
            exception => {
                this.isLoading = false;
                // TODO: manejo de errores Ej - 400:BadRequest
            }, () => {
                this.bsModalRef.hide();
            }
        );
    }

    formReady(): boolean {
        return !this.selectedProvider || !this.selectedFamily || !this.product.name || !this.product.description;
    }
}
