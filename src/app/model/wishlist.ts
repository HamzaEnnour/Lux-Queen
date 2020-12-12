import { Product } from './product';
import { User } from './user';

export class Wishlist {
    id: number;
    prod: Product;
    user: User;
    quantity: number;
    setId(id: number) {
        this.id = id;
    }
    setProd(p: Product) {
        this.prod = p;
    }
    setUser(u:User){
        this.user=u;
    }
    setQuantity(qu: number) {
        this.quantity = qu;
    }
}