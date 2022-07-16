import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AdmisionService} from '../../admision.service';

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.scss']
})
export class PostulacionesComponent implements OnInit, AfterViewInit {

  constructor(
      private _admisionService: AdmisionService,
  ) {
    this._admisionService.title.next('Postulaciones');
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

}
