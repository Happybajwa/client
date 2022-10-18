export interface Product{
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    gender: string;
    size: string;
    quantityInStock?: number;
}

export interface ProductParams{
    orderBy:string;
    searchBy?:string;
    size?:string[];
    gender?:string[];
    pageNumber:Number;
    pageSize:Number;
}