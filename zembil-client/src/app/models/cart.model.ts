import { Product } from './product.model';

export class Cart {
    _id:string;
    productName:string;
    unitPrice:number;
    quantity:number;
    imageUrl: string;
    subtotal:number
}
