export interface IPagination<T> {
    count: number;
    maxPages: number;
    page: number;
    totalElements: number;
    result: Array<T>;
}

export interface IDialogData<T> {
    suggestedValidation?: boolean;
    suggestedMeta?: any;
    suggestedHour?: Date;
    suggestedHourEnd?: Date;
    type?: string;
    meta: T;
    savedState?: boolean;
}

export interface Estado {
    id: number;
    estado: string;
}

export interface Encargado {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
}

export interface Cargo {
    id: number;
    nombreCargo: string;
    descripcion: string;
}
