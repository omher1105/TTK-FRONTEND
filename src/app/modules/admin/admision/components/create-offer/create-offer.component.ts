import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, UntypedFormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IDialogData} from '../../../../../shared/interfaces/common.interface';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {

  isUpdated = false;

  formActions: FormGroup;

  constructor(
      private _fb: UntypedFormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: IDialogData<any>,
      public dialogRef: MatDialogRef<CreateOfferComponent>,
  ) {
    this.createFormActions();
  }

  ngOnInit(): void {
  }

  createFormActions(): void {
    this.formActions = this._fb.group({
      titulo: [''],
      requisito: [''],
      descripcion: [''],
      cargo: [''],
    });
  }

}
