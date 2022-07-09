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
