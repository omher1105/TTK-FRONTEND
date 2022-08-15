import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AbstractChoice, Cargo, Estado, IDialogData} from '../../../../../shared/interfaces/common.interface';
import {CommonService} from '../../../../../shared/services/common.service';
import {OfertasService} from '../../containers/ofertas/ofertas.service';
import {Observable, Subject, takeUntil} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageProviderService} from '../../../../../shared/services/message-provider.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../../../../core/auth/auth.service';
import {User} from 'app/core/user/user.types';
import {UserService} from '../../../../../core/user/user.service';


@Component({
    selector: 'app-create-offer',
    templateUrl: './create-offer.component.html',
    styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit, OnDestroy {

    formActions: FormGroup;

    positions$: Observable<AbstractChoice[]>;

    user: User;

    _unsubscribeAll = new Subject<void>();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IDialogData<any>,
        public dialogRef: MatDialogRef<CreateOfferComponent>,
        private _fb: UntypedFormBuilder,
        private _ngxSpinner: NgxSpinnerService,
        private _userService: UserService,
        private _commonService: CommonService,
        private _offerService: OfertasService,
        private _snackBar: MatSnackBar
    ) {
        this.createFormActions();
        this.setValues();
    }

    ngOnInit(): void {
        this.positions$ = this._commonService.getPositions();

        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;
            });
    }

    createFormActions(): void {
        this.formActions = this._fb.group({
            id: [null],
            title: [null, [Validators.required]],
            requisito: [null, [Validators.required]],
            description: [null, [Validators.required]],
            position: [null, [Validators.required]],
        });
    }

    setValues(): void {
        this.formActions.patchValue(this.data?.meta);
    }

    get id(): FormControl {
        return this.formActions.get('id') as FormControl;
    }

    createOrEditOffer(): void {
        if (this.formActions.valid) {
            this._ngxSpinner.show();
            const payload = this.castToPayload(this.formActions.getRawValue());
            this.evaluateTransaction(payload);
        } else {
            this.formActions.markAllAsTouched();
        }
    }

    castToPayload(rawValue) {
        const payload = {...rawValue};
        console.log('payload ==> ', payload);
        payload.position = payload?.position?.id || null;
        return payload;
    }

    async evaluateTransaction(payload) {
        try {
            await this.createOrUpdateOffer(payload).toPromise();
            this.dialogRef.close();
        } catch (err) {
            this._snackBar.open('Error al crear al oferta',
                'Cancelar', {duration: 2000});
            throw new Error(err);
        } finally {
            this._ngxSpinner.hide();
        }
    }

    createOrUpdateOffer(payload): Observable<any> {
        if (payload?.id) {
            return this._offerService.update(payload);
        }
        return this._offerService.create(payload, this.user);
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
