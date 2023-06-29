import {Routes} from '@angular/router';
import {
    SimplyWhiteLayout,
    BlankSimplywhiteComponent
} from './@pages/layouts';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from '../_helper/auth.guard';

export const AppRoutes: Routes = [
    {
        path: '',
        component: SimplyWhiteLayout,
        canActivate: [AuthGuard],
        children: [
            {
                path: '', component: DashboardComponent, data: {
                    breadcrumb: [
                        {label: 'Dashboard', link: '#'},
                    ]
                }
            },
            {path: 'catalogs', loadChildren: () => import('./catalogs/catalogs.module').then(m => m.CatalogsModule)}
        ]
    },
    {
        path: '',
        component: BlankSimplywhiteComponent,
        children: [
            {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
        ]
    },
    {path: '**', redirectTo: ''}
];
