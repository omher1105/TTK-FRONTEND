import {Component, OnInit} from '@angular/core';
import {FormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import {SolicitudService} from '../../solicitud.service';
import {Observable, Subject, takeUntil} from 'rxjs';
import {AbstractChoice} from '../../../../../shared/interfaces/common.interface';
import {CommonService} from '../../../../../shared/services/common.service';
import {NgxSpinnerService} from 'ngx-spinner';
import moment from 'moment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {User} from '../../../../../core/user/user.types';
import {AuthService} from '../../../../../core/auth/auth.service';
import {UserService} from '../../../../../core/user/user.service';
import {FormUtils} from '../../../../../shared/utils/form.utils';

@Component({
    selector: 'app-registrar-postulacion',
    templateUrl: './registrar-postulacion.component.html',
    styleUrls: ['./registrar-postulacion.component.scss']
})
export class RegistrarPostulacionComponent implements OnInit {

    formActions: FormGroup;
    civilStatus$: Observable<AbstractChoice[]>;
    departments$: Observable<AbstractChoice[]>;
    provinces$: Observable<AbstractChoice[]>;
    districts$: Observable<AbstractChoice[]>;

    user: User;

    unsubscribe = new Subject<void>();

    constructor(
        private _fb: UntypedFormBuilder,
        private _ngxSpinnerService: NgxSpinnerService,
        private _requestService: SolicitudService,
        private _commonService: CommonService,
        private _snackService: MatSnackBar,
        private _userService: UserService,
    ) {
        this.createFormActions();
    }

    ngOnInit(): void {
        this.civilStatus$ = this._commonService.getCivilStatus({paginated: false});
        this.departments$ = this._commonService.getDepartments({paginated: false});
        this.provinces$ = this._commonService.getProvinces({paginated: false});
        this.districts$ = this._commonService.getDistricts({paginated: false});

        this._requestService.eventCreate
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(_ => {
                this.createRequest();
            });

        this._userService.user$.subscribe(user => {
            this.user = user;
        });

        this.formActions.get('imageFile').valueChanges.subscribe(value=>console.log('value', value));
    }

    createFormActions(): void {
        this.formActions = this._fb.group({
            id: [null],
            name: [null, [Validators.required]],
            secondName: [null],
            lastName: [null, [Validators.required]],
            surName: [null, [Validators.required]],
            documentNumber: [null, [Validators.required]],
            address: [null],
            email: [null, [Validators.required, Validators.email]],
            secondaryEmail: [null],
            birthDate: [null, [Validators.required]],
            civilStatus: [null, [Validators.required]],
            department: [null, [Validators.required]],
            province: [null, [Validators.required]],
            district: [null, [Validators.required]],
            phone: [null],
            cellphone: [null, [Validators.required]],
            secondCellphone: [null],
            status: [null],
            isTravel: [null],
            isExperience: [null],
            professionDescription: [null],
            profesionLocation: [null],
            profesionLastCourse: [null],
            profesionCompany: [null],
            workDescription: [null],
            workStart: [null],
            workEnd: [null],
            workCompany: [null],
            workExitDescription: [null],
            curriculumFile: [null, [Validators.required]],
            documentFile: [null],
            imageFile: [null],
        });
    }

    createRequest(): void {
        if (this.formActions.valid) {
            this._ngxSpinnerService.show();
            const payload = this.formActions.getRawValue();
            payload.birthDate = payload.birthDate ? moment(payload.birthDate).format('YYYY-MM-DD') : null;
            payload.workStart = payload.workStart ? moment(payload.workStart).format('YYYY-MM-DD') : null;
            payload.workEnd = payload.workEnd ? moment(payload.workEnd).format('YYYY-MM-DD') : null;
            payload.curriculumFile = payload.curriculumFile ? payload.curriculumFile?.files[0] : null;
            payload.documentFile = payload.documentFile ? payload.documentFile?.files[0] : null;
            payload.imageFile = payload.imageFile ? payload.imageFile?.files[0] : null;
            const formData = FormUtils.parseToFormData(payload);
            this.createTransaction(formData);
        } else {
            this.formActions.markAllAsTouched();
        }
    }

    async createTransaction(payload): Promise<void> {
        try {
            await this._requestService.registerRequest(payload).toPromise();
            this.user.isFillForm = true;
            this._userService._user.next(this.user);
            this._snackService.open('Solicitud registrada correctamente', 'Cerrar', {duration: 2000});
            this.formActions.reset();
        } catch (err) {
            throw new Error(err);
        } finally {
            await this._ngxSpinnerService.hide();
        }
    }

}
