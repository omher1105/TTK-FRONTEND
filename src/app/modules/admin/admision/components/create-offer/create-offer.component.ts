import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Cargo, Estado, IDialogData} from '../../../../../shared/interfaces/common.interface';
import {CommonService} from '../../../../../shared/services/common.service';
import {OfertasService} from '../../containers/ofertas/ofertas.service';
import {Observable} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';



@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {

  formActions: FormGroup;

  positions$: Observable<Cargo[]>;

  constructor(
      private _fb: UntypedFormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: IDialogData<any>,
      public dialogRef: MatDialogRef<CreateOfferComponent>,
      private _ngxSpinner: NgxSpinnerService,
      private _commonService: CommonService,
      private _offerService: OfertasService,
  ) {
    this.createFormActions();
    this.setValues();
  }

  ngOnInit(): void {
    this.positions$ = this._commonService.getPositions();
  }

  createFormActions(): void {
    this.formActions = this._fb.group({
      id: [null],
      titulo: [null, [Validators.required]],
      requisito: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      cargoOferta: [null],
    });
  }

  setValues(): void {
    console.log('==>',this.data.meta);
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
    if (!payload?.id) {
      payload.estadoOferta = {
        id: 1
      }
      payload.postulantes = 0;
    }
    return payload;
  }

  async evaluateTransaction(payload) {
    try {
      await this.createOrUpdateOffer(payload).toPromise();
      this._ngxSpinner.hide();
      this.dialogRef.close();
    } catch (err) {
      throw new Error(err);
    }
  }

  createOrUpdateOffer(payload): Observable<any> {
    if (payload?.id) {
      return this._offerService.updateOffer(payload);
    }
    return this._offerService.createOffer(payload);
  }

}
