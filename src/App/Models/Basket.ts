export interface BasketItem {
    productId: number;
    name: string;
    price: number;
    pictureUrl: string;
    quantity: number;
    size: string;
    gender: string;
}

export interface Basket {
    id: number;
    buyerId: string;
    items: BasketItem[];
    paymentIntentId?:string;
    clientSecret?:string;
}