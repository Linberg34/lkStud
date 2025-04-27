import { FileDto } from "../Files";
import { UsefulServiceCategory } from "./useful-service-category";

export interface UsefulServiceDto {
    id:string,
    title:string,
    category:UsefulServiceCategory,
    description:string,
    link:string,
    termsOfDisctribution:string,
    logo:FileDto,
}