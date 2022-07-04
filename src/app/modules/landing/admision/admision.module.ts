import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdmisionComponent} from './admision.component';
import {OfertasLaboralesComponent} from './containers/ofertas-laborales/ofertas-laborales.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: AdmisionComponent,
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'ofertas-laborales'},
            {
                path: 'ofertas-laborales',
                component: OfertasLaboralesComponent,
            }
        ]
    }
];

@NgModule({
    declarations: [
        AdmisionComponent,
        OfertasLaboralesComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class AdmisionModule {
}
