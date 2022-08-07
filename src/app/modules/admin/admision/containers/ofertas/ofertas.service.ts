import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {IPagination} from '../../../../../shared/interfaces/common.interface';
import {Oferta} from '../../admision.interface';
import {User} from '../../../../../core/user/user.types';

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
        return this._httpClient.get<IPagination<Oferta>>(`${this.apiUrl}admision/offers/`, {params: queryParams});
    }

    createOffer(payload, user: User): Observable<any> {
        payload.offerCreator = user.id;
        return this._httpClient.post<any>(`${this.apiUrl}admision/offers/`, payload);
    }

    updateOffer(payload): Observable<any> {
        return this._httpClient.patch<any>(`${this.apiUrl}admision/offers/${payload.id}/`, payload);
    }
}
