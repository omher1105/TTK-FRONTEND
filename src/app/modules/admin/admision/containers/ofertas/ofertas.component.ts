import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, merge, Observable, Subject, switchMap, takeUntil} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {OfertasService} from './ofertas.service';
import {Oferta} from '../../admision.interface';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormUtils} from '../../../../../shared/utils/form.utils';
import {CreateOfferComponent} from '../../components/create-offer/create-offer.component';
import {MessageProviderService} from '../../../../../shared/services/message-provider.service';
import {ChangeStatusComponent} from '../../components/change-status/change-status.component';
import {AdmisionService} from '../../admision.service';
import {IPagination} from '../../../../../shared/interfaces/common.interface';

@Component({
    selector: 'app-ofertas',
    templateUrl: './ofertas.component.html',
    styleUrls: ['./ofertas.component.scss']
})
export class OfertasComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource: Oferta[] = [];
    displayedColumns: string[] = ['estado', 'ofertas', 'postulantes', 'creador', 'fecha_publicacion', 'actions'];

    count = 0;

    changesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private _ngxSpinner: NgxSpinnerService,
        private _messageProviderService: MessageProviderService,
        private _offerService: OfertasService,
        private _admisionService: AdmisionService,
    ) {
        this._admisionService.title.next('Ofertas');
    }

    ngOnInit(): void {
        this._offerService.eventCreate
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(_ => this.createOrEditOffer());
    }

    ngAfterViewInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Items por página.';

        this.initPagination();
    }

    initPagination(): void {
        merge(this.paginator.page, this.changesSubject, this._offerService.eventFilters)
            .pipe(
                switchMap(() => {
                    this._ngxSpinner.show();
                    const rawValue = this._offerService.eventFilters.value;
                    const filters = rawValue ? FormUtils.deleteKeysNullInObject(rawValue) : null;
                    const isFilters = !!filters;
                    const queryParamsByPaginator = {...filters} as any;
                    queryParamsByPaginator.size = this.paginator.pageSize;
                    queryParamsByPaginator.numpagina = this.paginator.pageIndex + 1;
                    return this.getEvaluateOffersByFilters(queryParamsByPaginator, isFilters);
                })
            ).subscribe((response) => {
            this._ngxSpinner.hide();
            this.count = response.totalElements;
            this.dataSource = response.result;
        });
    }

    getEvaluateOffersByFilters(queryParamsByPaginator, isFilters = false): Observable<IPagination<Oferta>> {
        if (!isFilters) {
            return this._offerService.getOffers(queryParamsByPaginator);
        }
        return this._offerService.getOffersByFilters(queryParamsByPaginator);
    }

    createOrEditOffer(element?): void {
        const dialogData = {
            data: {
                meta: element
            },
            width: '30vw',
            disableClose: true
        };

        const dialogRef = this._messageProviderService.showModal(CreateOfferComponent, dialogData);
        dialogRef.afterClosed().subscribe(_ => {
            this.changesSubject.next(true);
        });
    }

    changeStatusOffer(element?): void {
        const dialogData = {
            data: {
                meta: element
            },
            width: '30vw',
            disableClose: true
        };

        const dialogRef = this._messageProviderService.showModal(ChangeStatusComponent, dialogData);
        dialogRef.afterClosed().subscribe(_ => {
            this.changesSubject.next(true);
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
