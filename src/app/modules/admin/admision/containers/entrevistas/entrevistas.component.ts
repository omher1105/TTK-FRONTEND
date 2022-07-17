import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AdmisionService} from '../../admision.service';

@Component({
  selector: 'app-entrevistas',
  templateUrl: './entrevistas.component.html',
  styleUrls: ['./entrevistas.component.scss']
})
export class EntrevistasComponent implements OnInit, AfterViewInit {

  constructor(
      private _admisionService: AdmisionService,
  ) {
    this._admisionService.title.next('Entrevistas');
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

}
