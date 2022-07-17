import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, UntypedFormBuilder} from '@angular/forms';
import {OfertasService} from '../../containers/ofertas/ofertas.service';
import {debounceTime, Observable, Subject, takeUntil} from 'rxjs';
import moment from 'moment';
import {Encargado, Estado} from '../../../../../shared/interfaces/common.interface';
import {CommonService} from '../../../../../shared/services/common.service';

@Component({
    selector: 'app-offer-filters',
    templateUrl: './offer-filters.component.html',
    styleUrls: ['./offer-filters.component.scss']
})
export class OfferFiltersComponent implements OnInit, AfterViewInit {

    formFilters: FormGroup;

    status$: Observable<Estado[]>;
    employees$: Observable<Encargado[]>;

    unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private _fb: UntypedFormBuilder,
        private _commonService: CommonService,
        private _offerService: OfertasService,
    ) {
        this.createFormFilters();
    }

    ngOnInit(): void {
        this.status$ = this._commonService.getStatus();
        this.employees$ = this._commonService.getEmployees();
    }

    ngAfterViewInit(): void {
        this.formFilters.valueChanges
            .pipe(takeUntil(this.unsubscribe), debounceTime(500))
            .subscribe(value => {
                const parsedData = this.castToParams(value);
                this._offerService.eventFilters.next(parsedData);
            });
    }

    castToParams(filters) {
        return {
            ...filters,
            fechaPublicacion: filters?.fechaPublicacion ?
                moment(filters?.fechaPublicacion).format('YYYY-MM-DD')
                : null
        }
    }

    createFormFilters(): void {
        this.formFilters = this._fb.group({
            search: [''],
            estadoOferta: [''],
            creadorOferta: [''],
            fechaPublicacion: [''],
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
