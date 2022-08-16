import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IDialogData} from '../../../../../shared/interfaces/common.interface';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-change-sub-status',
  templateUrl: './change-sub-status.component.html',
  styleUrls: ['./change-sub-status.component.scss']
})
export class ChangeSubStatusComponent implements OnInit {

  formActions: FormGroup;

  constructor(
      private _fb: UntypedFormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: IDialogData<any>,
      public dialogRef: MatDialogRef<ChangeSubStatusComponent>,
      private _ngxSpinner: NgxSpinnerService,
  ) {
    this.createFormActions();
    this.setValues();
  }

  ngOnInit(): void {
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
      status: [null, [Validators.required]],
    });
  }

}
