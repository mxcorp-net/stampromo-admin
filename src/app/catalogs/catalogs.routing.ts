import {Routes} from '@angular/router';
import {ProductListComponent} from './products/product-list/product-list.component';
import {ProductEditComponent} from './products/product-edit/product-edit.component';
import {FamilyListComponent} from './families/family-list/family-list.component';
import {FamilyEditComponent} from './families/family-edit/family-edit.component';
import {ProductShowComponent} from './products/product-show/product-show.component';

export const CatalogsRouting: Routes = [
    {
        path: 'products',
        data: {
            breadcrumb: [
                {label: 'Catalogs', link: '#'},
                {label: 'Products', link: '/catalogs/products'},
            ]
        },
        component: ProductListComponent
    },
    {
        path: 'products/:id',
        data: {
            breadcrumb: [
                {label: 'Catalogs', link: '#'},
                {label: 'Products', link: '/catalogs/products'},
            ]
        },
        component: ProductShowComponent
    },
    {
        path: 'products/:id/edit',
        data: {
            breadcrumb: [
                {label: 'Catalogs', link: '#'},
                {label: 'Products', link: '/catalogs/products'},
                {label: 'Edit', link: '#'},
            ]
        },
        component: ProductEditComponent
    },
    {
        path: 'families',
        data: {
            breadcrumb: [
                {label: 'Catalogs', link: '#'},
                {label: 'Families', link: '/catalogs/families'},
            ]
        },
        component: FamilyListComponent
    },
    {
        path: 'families/:id',
        data: {
            breadcrumb: [
                {label: 'Catalogs', link: '#'},
                {label: 'Families', link: '/catalogs/families'},
                {label: 'Edit', link: '#'},
            ]
        },
        component: FamilyEditComponent
    },
];
