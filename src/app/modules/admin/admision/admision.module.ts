import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdmisionComponent} from './admision.component';
import {PostulacionesComponent} from './containers/postulaciones/postulaciones.component';
import {OfertasComponent} from './containers/ofertas/ofertas.component';
import {EntrevistasComponent} from './containers/entrevistas/entrevistas.component';
import {ExamenMedicoComponent} from './containers/examen-medico/examen-medico.component';
import {EvaluacionesComponent} from './containers/evaluaciones/evaluaciones.component';
import {RouterModule, Routes} from '@angular/router';
import { ConfiguracionComponent } from './containers/configuracion/configuracion.component';

const routes: Routes = [
    {
        path: '',
        component: AdmisionComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'postulaciones',
            },
            {
                path: 'postulaciones',
                component: PostulacionesComponent,
            },
            {
                path: 'ofertas',
                component: OfertasComponent,
            },
            {
                path: 'entrevistas',
                component: EntrevistasComponent,
            },
            {
                path: 'examen-medico',
                component: ExamenMedicoComponent,
            },
            {
                path: 'evaluaciones',
                component: EvaluacionesComponent,
            },
            {
                path: 'configuracion',
                component: ConfiguracionComponent,
            },
        ]
    }
];

@NgModule({
    declarations: [
        AdmisionComponent,
        PostulacionesComponent,
        OfertasComponent,
        EntrevistasComponent,
        ExamenMedicoComponent,
        EvaluacionesComponent,
        ConfiguracionComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class AdmisionModule {
}
