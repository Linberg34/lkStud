import { UsefulServiceCategory } from "./useful-service-category";

export interface UsefulServiceEditCreateDto {
    category:UsefulServiceCategory,
    title:string,
    description:string,
    link:string,
    termsOfDisctribution:string,
    logoId:string,
}