import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AdmisionService} from '../../admision.service';

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styleUrls: ['./evaluaciones.component.scss']
})
export class EvaluacionesComponent implements OnInit, AfterViewInit {

  constructor(
      private _admisionService: AdmisionService,
  ) {
    this._admisionService.title.next('Evaluaciones');
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
}
