import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {IPagination} from '../../../../../shared/interfaces/common.interface';
import {Oferta} from '../../admision.interface';

@Injectable({
    providedIn: 'root'
})
export class OfertasService {

    private apiUrl = environment.apiUrl;

    public eventCreate: Subject<void> = new Subject<void>();
    public eventFilters: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private _httpClient: HttpClient,
    ) {
    }

    getOffers(queryParams = null): Observable<IPagination<Oferta>> {
        return this._httpClient.get<IPagination<Oferta>>(`${this.apiUrl}oferta/lista`, {params: queryParams});
    }

    createOffer(payload): Observable<any> {
        return this._httpClient.put<any>(`${this.apiUrl}oferta/crear`, payload);
    }

    updateOffer(payload): Observable<any> {
        return this._httpClient.patch<any>(`${this.apiUrl}oferta/actualizar/${payload.id}`, payload);
    }
}
