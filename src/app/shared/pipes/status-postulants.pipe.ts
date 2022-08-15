import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPostulants'
})
export class StatusPostulantsPipe implements PipeTransform {

  transform(status: number): string {
    switch (status) {
      case 1:
        return 'Verificado';
      case 2:
        return 'Entrevista personal';
      case 3:
        return 'Fuera del proceso';
      case 4:
        return 'Examen medico';
      case 5:
        return 'Ingresado';
      case 6:
        return 'Referencias personales';
      case 7:
        return 'Poligrafia';
      case 8:
        return 'Evaluacion Psicolaboral';
      case 9:
        return 'Alta empresa';
    }
  }

}
