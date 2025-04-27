import { PagedListMetaData } from "../paged-list-meta-data";
import { UsefulServiceDto } from "./useful-service-dto";

export interface UsefulServiceDtoPagedListWithMetadata {
    results: UsefulServiceDto[],
    metaData: PagedListMetaData
}