import { Component, OnInit } from '@angular/core';
import {FormGroup, UntypedFormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-registrar-postulacion',
  templateUrl: './registrar-postulacion.component.html',
  styleUrls: ['./registrar-postulacion.component.scss']
})
export class RegistrarPostulacionComponent implements OnInit {

  formActions: FormGroup;

  constructor(
      private _fb: UntypedFormBuilder,
  ) {
    this.createFormActions();
  }

  ngOnInit(): void {
  }

  createFormActions(): void {
    this.formActions = this._fb.group({
      id: [null],
      isTravel: [null],
      isExperience: [null],
    });
  }

}
