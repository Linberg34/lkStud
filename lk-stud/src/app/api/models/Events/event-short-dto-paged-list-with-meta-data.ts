import { PagedListMetaData } from "../paged-list-meta-data";
import { EventShortDto } from "./event-short-dto";

export interface EventShortDtoPagedListWithMetaData{
    results:EventShortDto[],
    metaData: PagedListMetaData
}