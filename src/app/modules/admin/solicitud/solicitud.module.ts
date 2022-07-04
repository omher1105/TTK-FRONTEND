import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SolicitudComponent} from './solicitud.component';
import {RegistrarPostulacionComponent} from './containers/registrar-postulacion/registrar-postulacion.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: SolicitudComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'registrar-solicitud',
            },
            {
                path: 'registrar-solicitud',
                component: RegistrarPostulacionComponent,
            },
        ]
    }
];

@NgModule({
    declarations: [
        SolicitudComponent,
        RegistrarPostulacionComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class SolicitudModule {
}
