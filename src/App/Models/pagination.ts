export interface PageData{
    currentPage:number;
    totalPages:number;
    pageSize:number;
    totalCount:number;
}

export class PaginatedResponse<T>{
    items:T;
    pageData:PageData;

    constructor(items:T, pageData:PageData) {
        this.items = items;
        this.pageData = pageData;
    }
}