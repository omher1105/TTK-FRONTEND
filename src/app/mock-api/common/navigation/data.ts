/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultItemsNavigations: FuseNavigationItem[] = [
    {
        id   : 'empresa',
        title: 'Empresa',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/empresa',
        isAdmin: true
    },
    {
        id: 'solicitudes',
        title: 'Solicitudes',
        type: 'group',
        isPostulant: true,
        isAdmin: true,
        children: [
            {
                id: 'registrar-solicitud',
                title: 'Registrar solicitud',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/solicitud/registrar-solicitud',
                isPostulant: true,
                isAdmin: true,
            },
        ]
    },
    {
        id   : 'rrhh',
        title: 'R.R.H.H.',
        type : 'group',
        isAdmin: true,
        children: [
            {
                id   : 'admision',
                title: 'Admisión',
                type : 'collapsable',
                icon : 'heroicons_outline:chart-pie',
                link : '/recursos-humanos/admision',
                isAdmin: true,
                children: [
                    {
                        id: 'postulaciones',
                        title: 'Postulaciones',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/recursos-humanos/admision/postulaciones',
                        isAdmin: true,
                    },
                    {
                        id: 'ofertas',
                        title: 'Ofertas',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/recursos-humanos/admision/ofertas',
                        isAdmin: true,
                    },
                    {
                        id: 'entrevistas',
                        title: 'Entrevistas',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/recursos-humanos/admision/entrevistas',
                        isAdmin: true,
                    },
                    {
                        id: 'examen-medico',
                        title: 'Examen médico',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/recursos-humanos/admision/examen-medico',
                        isAdmin: true,
                    },
                    {
                        id: 'evaluaciones',
                        title: 'Evaluaciones',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/recursos-humanos/admision/evaluaciones',
                        isAdmin: true,
                    },
                ]
            },
            {
                id   : 'personal',
                title: 'Personal',
                type : 'basic',
                icon : 'heroicons_outline:chart-pie',
                link : '/recursos-humanos/personal',
                isAdmin: true,
            },
        ]
    }
];

export const defaultNavigation: FuseNavigationItem[] = [...defaultItemsNavigations];
export const compactNavigation: FuseNavigationItem[] = [...defaultItemsNavigations];
export const futuristicNavigation: FuseNavigationItem[] = [...defaultItemsNavigations];
export const horizontalNavigation: FuseNavigationItem[] = [...defaultItemsNavigations];
