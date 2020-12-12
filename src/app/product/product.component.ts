import { Product } from './../model/product';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { CartService } from '../service/cart.service';
import { User } from '../model/user';
import { Cart } from '../model/cart';
import { WishlistService } from '../service/wishlist.service';
import { Wishlist } from '../model/wishlist';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product : Product[];

  constructor(private Ps: ProductService,private Cs: CartService,private Ws: WishlistService,private router: Router) { }

  ngOnInit(): void {
    this.Ps.getProducts().subscribe(
      (data: any[]) => {
        this.product = data;
        console.log(this.product);
      });
  }

  isOutOfStock(quant : number) : boolean {
    if(quant==0)
    return true;
    else
    return false;
  }
  addToCart(p : Product) {
    var Tempuser = JSON.parse(localStorage.getItem('CurrentUser'));
    var user = new User();
    user.setId(Tempuser[0].id);
    user.setFullName(Tempuser[0].full_name);
    user.setLogin(Tempuser[0].login);
    user.setImage(Tempuser[0].image)
    user.setEmail(Tempuser[0].email);
    user.setPassword(Tempuser[0].password);
    /////
    var c= new Cart();
    c.setTotal(p.price*p.quantity)
    c.setQuantity(1)
    c.setUser(user)
    c.setProd(p)
    this.Cs.addCart(c).subscribe(x =>this.router.navigateByUrl('/cart'));
  }

  addToWishlist(p : Product) {
    var Tempuser = JSON.parse(localStorage.getItem('CurrentUser'));
    var user = new User();
    user.setId(Tempuser[0].id);
    user.setFullName(Tempuser[0].full_name);
    user.setLogin(Tempuser[0].login);
    user.setImage(Tempuser[0].image)
    user.setEmail(Tempuser[0].email);
    user.setPassword(Tempuser[0].password);
    /////
    var w= new Wishlist();
    w.setQuantity(1)
    w.setUser(user)
    w.setProd(p)
    this.Ws.addWishlist(w).subscribe(x =>this.router.navigateByUrl('/wishlist'));
  }

}
