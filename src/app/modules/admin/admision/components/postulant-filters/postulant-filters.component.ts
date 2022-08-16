import { Component, OnInit } from '@angular/core';
import {FormGroup, UntypedFormBuilder} from '@angular/forms';
import {debounceTime, Observable, Subject, takeUntil} from 'rxjs';
import {PostulacionesService} from '../../containers/postulaciones/postulaciones.service';
import moment from 'moment';
import {User} from '../../../../../core/user/user.types';
import {UserService} from '../../../../../core/user/user.service';

@Component({
  selector: 'app-postulant-filters',
  templateUrl: './postulant-filters.component.html',
  styleUrls: ['./postulant-filters.component.scss']
})
export class PostulantFiltersComponent implements OnInit {

  formFilters: FormGroup;

  employees$: Observable<User[]>;

  status = [
    {id: 1, name: 'Verificacion'},
    {id: 2, name: 'Entrevista personal'},
    {id: 3, name: 'Fuera del proceso'},
    {id: 4, name: 'Examen medico'},
    {id: 5, name: 'Ingresado'},
    {id: 6, name: 'Referencias personales'},
    {id: 7, name: 'Poligrafia'},
    {id: 8, name: 'Evaluacion Psicolaboral'},
    {id: 9, name: 'Alta empresa'},
  ];

  unsubscribe: Subject<void> = new Subject<void>();

  constructor(
      private _fb: UntypedFormBuilder,
      private _postulantServices: PostulacionesService,
      private _userService: UserService,
  ) {
    this.createFormFilters();
  }

  ngOnInit(): void {
    this.employees$ = this._userService.getAll({paginated: false});
  }

  ngAfterViewInit(): void {
    this.formFilters.valueChanges
        .pipe(takeUntil(this.unsubscribe), debounceTime(500))
        .subscribe(value => {
          const parsedData = this.castToParams(value);
          this._postulantServices.eventFilters.next(parsedData);
        });
  }

  castToParams(filters) {
    return filters;
  }

  createFormFilters(): void {
    this.formFilters = this._fb.group({
      search: [null],
      assigned: [null],
      status: [null],
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
