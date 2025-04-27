export interface PagedListMetaData {
    readonly pageCount: number;
    readonly totalItemCount: number;
    readonly pageNumber: number;
    readonly pageSize: number;
    readonly hasPreviousPage: boolean;
    readonly hasNextPage: boolean;
    readonly isFirstPage: boolean;
    readonly isLastPage: boolean;
    readonly firstItemOnPage: number;
    readonly lastItemOnPage: number;
}
