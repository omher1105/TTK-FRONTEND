import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AdmisionService} from '../../admision.service';

@Component({
  selector: 'app-examen-medico',
  templateUrl: './examen-medico.component.html',
  styleUrls: ['./examen-medico.component.scss']
})
export class ExamenMedicoComponent implements OnInit, AfterViewInit {

  constructor(
      private _admisionService: AdmisionService,
  ) {
    this._admisionService.title.next('Examen medico');
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

}
