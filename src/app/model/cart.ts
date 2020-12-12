import { Product } from './product';
import { User } from './user';

export class Cart {
    id: number;
    prod: Product;
    user: User;
    total: number;
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
    setTotal(pr: number) {
        this.total = pr;
    }
    setQuantity(qu: number) {
        this.quantity = qu;
    }
}