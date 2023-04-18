import {Routes} from '@angular/router';
import {ProductsCatalogComponent} from './products-catalog/products-catalog.component';
import {CategoriesCatalogComponent} from './categories-catalog/categories-catalog.component';
import {FamiliesCatalogComponent} from './families-catalog/families-catalog.component';
import {ColorsCatalogComponent} from './colors-catalog/colors-catalog.component';
import {ProvidersCatalogComponent} from './providers-catalog/providers-catalog.component';
import {TagsCatalogComponent} from './tags-catalog/tags-catalog.component';
import {ServicesCatalogComponent} from './services-catalog/services-catalog.component';

export const CatalogsRoute: Routes = [
    {
        path: 'products',
        data: {layoutOption : {'Catalogs' : '#', 'Products': '#'}},
        component: ProductsCatalogComponent
    },
    {
        path: 'providers',
        data: {layoutOption : {'Catalogs' : '#', 'Providers': '#'}},
        component: ProvidersCatalogComponent
    },
    {
        path: 'services',
        data: {layoutOption : {'Catalogs' : '#', 'Services': '#'}},
        component: ServicesCatalogComponent
    },
    {
        path: 'categories',
        data: {layoutOption : {'Catalogs' : '#', 'Categories': '#'}},
        component: CategoriesCatalogComponent
    },
    {
        path: 'families',
        data: {layoutOption : {'Catalogs' : '#', 'Families': '#'}},
        component: FamiliesCatalogComponent
    },
    {
        path: 'colors',
        data: {layoutOption : {'Catalogs' : '#', 'Colors': '#'}},
        component: ColorsCatalogComponent
    },
    {
        path: 'tags',
        data: {layoutOption : {'Catalogs' : '#', 'Tags': '#'}},
        component: TagsCatalogComponent
    }
];
