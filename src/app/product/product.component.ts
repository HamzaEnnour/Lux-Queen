import { NavbarComponent } from './../navbar/navbar.component';
import { Product } from './../model/product';
import { Component, Input, OnInit, ViewChild, AfterContentInit, AfterViewChecked, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { CartService } from '../shared/cart.service';
import { User } from '../model/user';
import { Cart } from '../model/cart';
import { WishlistService } from '../shared/wishlist.service';
import { Wishlist } from '../model/wishlist';
import { AfterViewInit } from '@angular/core';
import { QueryList } from '@angular/core';
import { ViewChildren } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit,AfterViewChecked   {
  product: Product[];
  startIndex = 0;
  endIndex = 4;
  n:number;
  search: string;
  customerData:any
  public searchText: string;
  
  @ViewChildren(NavbarComponent) child: QueryList<NavbarComponent>;
  ngAfterViewChecked(): void {
    this.child.forEach(e=>this.search=e.ss)
  }
  ngAfterViewInit(): void {
    this.child.changes.subscribe((comps: QueryList<NavbarComponent>) =>
    {
      console.log(comps.first.ss)
    });
  }

  constructor(private Ps: ProductService, private Cs: CartService, private Ws: WishlistService, private router: Router) { }

  ngOnInit(): void {

    this.customerData = [
      { name: "Anil kumar", Age: 34, blog: "https://code-view.com" },
      { name: "Sunil Kumar Singh", Age: 28, blog: "https://code-sample.xyz" },
      { name: "Sushil Singh", Age: 24, blog: "https://code-sample.com" },
      { name: "Aradhya Singh", Age: 5, blog: "https://code-sample.com" },
      { name: "Reena Singh", Age: 28, blog: "https://code-sample.com" },
      { name: "Alok Singh", Age: 35, blog: "https://code-sample.com" },
      { name: "Dilip Singh", Age: 34, blog: "https://code-sample.com" }
    ];

    this.Ps.getProducts().subscribe(
      (data: any[]) => {
        this.product = data;
        console.log(this.product);
      });
  }
  getArrayNumber(length: number) {
    this.n=Math.round((length / 4));
    return new Array(Math.round((length / 4)));

  }
  updateIndex(pageindex) {
    this.startIndex = Math.round(pageindex * 4);
    this.endIndex = Math.round(this.startIndex + 4);

  }

  isOutOfStock(quant: number): boolean {
    if (quant == 0)
      return true;
    else
      return false;
  }
  addToCart(p: Product) {
    var Tempuser = JSON.parse(localStorage.getItem('CurrentUser'));
    var user = new User();
    user.setId(Tempuser[0].id);
    user.setFullName(Tempuser[0].full_name);
    user.setLogin(Tempuser[0].login);
    user.setImage(Tempuser[0].image)
    user.setEmail(Tempuser[0].email);
    user.setPassword(Tempuser[0].password);
    /////
    var c = new Cart();
    c.setTotal(p.price * p.quantity)
    c.setQuantity(1)
    c.setUser(user)
    c.setProd(p)
    this.Cs.addCart(c).subscribe(x => this.router.navigateByUrl('/cart'));
  }

  addToWishlist(p: Product) {
    var Tempuser = JSON.parse(localStorage.getItem('CurrentUser'));
    var user = new User();
    user.setId(Tempuser[0].id);
    user.setFullName(Tempuser[0].full_name);
    user.setLogin(Tempuser[0].login);
    user.setImage(Tempuser[0].image)
    user.setEmail(Tempuser[0].email);
    user.setPassword(Tempuser[0].password);
    /////
    var w = new Wishlist();
    w.setQuantity(1)
    w.setUser(user)
    w.setProd(p)
    this.Ws.addWishlist(w).subscribe(x => this.router.navigateByUrl('/wishlist'));
  }

  DoSearch() {
    console.log(this.search)
    if (this.search != '') {
     /* this.Ps.findProductbyName(this.search).subscribe(
        (data: Product[]) => {
          this.product = data;
        });*/
        this.Ps.getProducts().subscribe(
          (data: Product[]) => {
            this.product = data;
          });
    } else {
      this.Ps.getProducts().subscribe(
        (data: Product[]) => {
          this.product = data;
        });
    }
  }

}
