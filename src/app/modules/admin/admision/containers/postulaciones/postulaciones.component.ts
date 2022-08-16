import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AdmisionService} from '../../admision.service';
import {MatPaginator} from '@angular/material/paginator';
import {Oferta} from '../../admision.interface';
import {BehaviorSubject, merge, Subject, switchMap} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageProviderService} from '../../../../../shared/services/message-provider.service';
import {OfertasService} from '../ofertas/ofertas.service';
import {FormUtils} from '../../../../../shared/utils/form.utils';
import {PostulacionesService} from './postulaciones.service';
import {ChangeStatusComponent} from '../../components/change-status/change-status.component';
import {
    ChangeResponsabilitiesComponent
} from '../../components/change-responsabilities/change-responsabilities.component';
import {CommonService} from '../../../../../shared/services/common.service';
import {ChangeSubStatusComponent} from '../../components/change-sub-status/change-sub-status.component';
import {SendCurriculumComponent} from '../../components/send-curriculum/send-curriculum.component';

@Component({
    selector: 'app-postulaciones',
    templateUrl: './postulaciones.component.html',
    styleUrls: ['./postulaciones.component.scss']
})
export class PostulacionesComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource: Oferta[] = [];
    displayedColumns: string[] = ['imagen', 'informacion', 'responsable', 'estado', 'actions'];

    count = 0;

    changesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private _ngxSpinner: NgxSpinnerService,
        private _messageProviderService: MessageProviderService,
        private _postulacionService: PostulacionesService,
        private _admisionService: AdmisionService,
        private _commonService: CommonService,
    ) {
        this._admisionService.title.next('Postulaciones');
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Items por página.';

        this.initPagination();
    }

    initPagination(): void {
        merge(this.paginator.page, this.changesSubject, this._postulacionService.eventFilters)
            .pipe(
                switchMap(() => {
                    this._ngxSpinner.show();
                    const rawValue = this._postulacionService.eventFilters.value;
                    const filters = rawValue ? FormUtils.deleteKeysNullInObject(rawValue) : null;
                    const queryParamsByPaginator = {...filters} as any;
                    queryParamsByPaginator.limit = this.paginator.pageSize;
                    queryParamsByPaginator.offset = queryParamsByPaginator.limit * this.paginator.pageIndex;
                    return this._postulacionService.get(queryParamsByPaginator);
                })
            ).subscribe((response) => {
            this._ngxSpinner.hide();
            this.count = response.count;
            this.dataSource = response.results;
        });
    }

    changeResponsability(element?): void {
        const dialogData = {
            data: {
                meta: element
            },
            width: '30vw',
            disableClose: true
        };

        this._messageProviderService.showModal(ChangeResponsabilitiesComponent, dialogData)
            .afterClosed().subscribe(_ => {
            this.changesSubject.next(true);
        });
    }

    changeSubStatus(element): void {
        const dialogData = {
            data: {
                meta: element
            },
            width: '50vw',
            disableClose: true
        };

        this._messageProviderService.showModal(ChangeSubStatusComponent, dialogData)
            .afterClosed().subscribe(_ => {
            this.changesSubject.next(true);
        });
    }

    async printPdf(element): Promise<void> {
        window.open(element.curriculumFile, '_blank').print();
    }

    downloadPdf(element): void {
        window.open(element.curriculumFile, '_blank');
    }

    sendEmail(element): void {
        const dialogData = {
            data: {
                meta: element
            },
            width: '30vw',
            disableClose: true
        };

        this._messageProviderService.showModal(SendCurriculumComponent, dialogData)
            .afterClosed().subscribe(_ => {
            this.changesSubject.next(true);
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
