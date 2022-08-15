import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {OfertasService} from '../../../../admin/admision/containers/ofertas/ofertas.service';
import {Observable} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Oferta} from '../../../../admin/admision/admision.interface';

@Component({
    selector: 'app-ofertas-laborales',
    templateUrl: './ofertas-laborales.component.html',
    styleUrls: ['./ofertas-laborales.component.scss'],
})
export class OfertasLaboralesComponent implements OnInit {

    search = new FormControl(null, [Validators.required]);

    availableOffers = [];

    constructor(
        private _router: Router,
        private _offerService: OfertasService,
    ) {
    }

    ngOnInit(): void {
        this._offerService.getAvailableOffers({paginated: false})
            .subscribe(results => {
                this.availableOffers = results;
            });
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    goLogin(offer: Oferta): void {
        localStorage.clear();
        this._router.navigate(['registro'],
            {queryParams: {offer: offer.id}});
    }

}
