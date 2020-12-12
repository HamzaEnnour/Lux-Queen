import { Product } from './product';
import { User } from './user';

export class Comment {
    id: number;
    description: string;
    user: User;
    prod: Product;

    setId(id: number) {
        this.id = id;
    }
    setDescription(des: string) {
        this.description = des;
    }
    setUser(u: User) {
        this.user = u;
    }
    setProduct(u: Product) {
        this.prod = u;
    }

}