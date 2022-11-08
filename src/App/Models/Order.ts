export interface ShippingAddress {
    fullName: string;
    address1: string;
    city: string;
    state: string;
    postCode: string;
    country: string;
}

export interface OrderItemsDto {
    productId: number;
    productName: string;
    pictureUrl: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: number;
    buyerId: string;
    shippingAddress: ShippingAddress;
    orderDate: string;
    orderItemsDto: OrderItemsDto[];
    subTotal: number;
    deliveryFees: number;
    orderStatus: string;
    total: number;
}