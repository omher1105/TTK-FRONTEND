import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IDialogData} from '../../../../../shared/interfaces/common.interface';
import {NgxSpinnerService} from 'ngx-spinner';
import {PostulacionesService} from '../../containers/postulaciones/postulaciones.service';
import {User} from '../../../../../core/user/user.types';
import {UserService} from '../../../../../core/user/user.service';

@Component({
    selector: 'app-send-curriculum',
    templateUrl: './send-curriculum.component.html',
    styleUrls: ['./send-curriculum.component.scss']
})
export class SendCurriculumComponent implements OnInit {

    formActions: FormGroup;

    user: User;

    constructor(
        private _fb: UntypedFormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: IDialogData<any>,
        public dialogRef: MatDialogRef<SendCurriculumComponent>,
        public _postulacionService: PostulacionesService,
        private _ngxSpinner: NgxSpinnerService,
        private _userService: UserService,
    ) {
        this.createFormActions();
        this.setValues();
    }

    ngOnInit(): void {
        this._userService.user$.subscribe(user => {
            this.user = user;
            this.formActions.get('email').setValue(user.email);
        });
    }

    setValues(): void {
        console.log('==>', this.data.meta);
        this.formActions.patchValue({
            id: this.data?.meta?.id
        });
    }

    createFormActions(): void {
        this.formActions = this._fb.group({
            id: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
        });
    }

    sendEmailCv(): void {
        if (this.formActions.valid) {
            this._ngxSpinner.show();
            const payload = this.formActions.getRawValue();
            this.evaluateTransaction(payload);
        } else {
            this.formActions.markAllAsTouched();
        }
    }

    async evaluateTransaction(payload) {
        try {
            await this._postulacionService.sendEmail(payload).toPromise();
            this.dialogRef.close();
        } catch (err) {
            throw new Error(err);
        } finally {
            this._ngxSpinner.hide();
        }
    }

}
