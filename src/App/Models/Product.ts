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