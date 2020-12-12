import { Cart } from './model/cart';
import { CartService } from './service/cart.service';
import { UserServiceService } from './service/user-service.service';
import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { WishlistService } from './service/wishlist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
 cart: Cart[];
  _length:number;
  _length2:number;
  title = 'ProjAngularCC';
  constructor(private Us: UserServiceService,private Cs : CartService,private Ws: WishlistService) { 
  }
  ngOnInit(): void {
    this.Cs.getCarts().subscribe(
      (data: any[]) => {
        this.cart = data;
        this._length=data.length
      });
      this.Ws.getWishlists().subscribe(
        (data: any[]) => {
          this.cart = data;
          this._length2=data.length
        });
  }

  isLogged(): boolean {
     return this.Us.isLoggedin();
  }
  DoLogOut() {
    this.Us.logout();
  }
}
