import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IDialogData} from '../../../../../shared/interfaces/common.interface';
import {Observable} from 'rxjs';
import {User} from '../../../../../core/user/user.types';
import {UserService} from '../../../../../core/user/user.service';
import moment from 'moment';
import {NgxSpinnerService} from 'ngx-spinner';
import {PostulacionesService} from '../../containers/postulaciones/postulaciones.service';

@Component({
  selector: 'app-change-responsabilities',
  templateUrl: './change-responsabilities.component.html',
  styleUrls: ['./change-responsabilities.component.scss']
})
export class ChangeResponsabilitiesComponent implements OnInit {

  formActions: FormGroup;
  employees$: Observable<User[]>;

  constructor(
      private _fb: UntypedFormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: IDialogData<any>,
      public dialogRef: MatDialogRef<ChangeResponsabilitiesComponent>,
      private _userService: UserService,
      private _ngxSpinner: NgxSpinnerService,
      private _postulacionService: PostulacionesService,
  ) {
    this.createFormActions();
    this.setValues();
  }

  ngOnInit(): void {
    this.employees$ = this._userService.getAll({paginated: false});
  }

  get id(): FormControl {
    return this.formActions.get('id') as FormControl;
  }

  setValues(): void {
    console.log('==>', this.data.meta);
    this.formActions.patchValue(this.data?.meta);
  }

  createFormActions(): void {
    this.formActions = this._fb.group({
      id: [null, [Validators.required]],
      assigned: [null, [Validators.required]],
    });
  }

  updateAssigned(): void {
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
      await this._postulacionService.update(payload).toPromise();
      this.dialogRef.close();
    } catch (err) {
      throw new Error(err);
    } finally {
      this._ngxSpinner.hide();
    }
  }

}
