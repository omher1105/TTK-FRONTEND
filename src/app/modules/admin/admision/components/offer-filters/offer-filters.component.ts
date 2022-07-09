import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, UntypedFormBuilder} from '@angular/forms';
import {OfertasService} from '../../containers/ofertas/ofertas.service';
import {debounceTime, Subject, takeUntil} from 'rxjs';
import moment from 'moment';

@Component({
    selector: 'app-offer-filters',
    templateUrl: './offer-filters.component.html',
    styleUrls: ['./offer-filters.component.scss']
})
export class OfferFiltersComponent implements OnInit, AfterViewInit {

    formFilters: FormGroup;

    status = [
        {id: 1, name: 'DESACTIVADA'},
        {id: 2, name: 'ACTIVADA'},
        {id: 3, name: 'CREADA'},
    ];

    unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private _fb: UntypedFormBuilder,
        private _offerService: OfertasService,
    ) {
        this.createFormFilters();
    }

    ngOnInit(): void {
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
                moment(filters?.fechaPublicacion).format('DD-MM-YYYY')
                : null
        }
    }

    createFormFilters(): void {
        this.formFilters = this._fb.group({
            search: [''],
            estado: [''],
            creador: [''],
            fechaPublicacion: [''],
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
