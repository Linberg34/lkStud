import { PagedListMetaData } from "../paged-list-meta-data";
import { ProfileShortDto } from "./profile-short-dto";

export interface ProfileShortDtoPagedListWithMetadata {
    results: ProfileShortDto[],
    metaData: PagedListMetaData
}