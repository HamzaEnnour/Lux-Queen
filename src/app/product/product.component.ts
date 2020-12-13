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
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit,AfterViewChecked   {
  product: Product[];
  tempwish : boolean= false;
  datatemp : Wishlist[]
  startIndex = 0;
  endIndex = 4;
  n:number;
  search: string;
  customerData:any
  private notifier: NotifierService;
  public searchText: string;
  
  @ViewChildren(NavbarComponent) child: QueryList<NavbarComponent>;
  ngAfterViewChecked(): void {
    this.child.forEach(e=>this.search=e.ss)
  }
  ngAfterViewInit(): void {
    this.child.changes.subscribe((comps: QueryList<NavbarComponent>) =>
    {
     // console.log(comps.first.ss)
    });
  }

  constructor(private Ps: ProductService, private Cs: CartService, private Ws: WishlistService, private router: Router,notifier: NotifierService) {
    this.notifier = notifier;
   }

  ngOnInit(): void {
    this.Ws.getWishlists().subscribe((data: Wishlist[]) =>
    {
      this.datatemp=data;
    });
    var Tempuser = JSON.parse(localStorage.getItem('CurrentUser'));
    this.Ps.getProducts().subscribe(
      (data: any[]) => {
        this.product = data;
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
    if(Tempuser !=null)
    {
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
    setTimeout(()=>{                        
      this.notifier.notify( 'success', "Product added successfully to your Cart list !!" );
 }, 500);
    this.Cs.addCart(c).subscribe(x => this.router.navigateByUrl('/cart'));
    }
    else
    {
      setTimeout(()=>{                        
        this.notifier.notify( 'error', "Please Log in before you add to your cart !!" );
   }, 500);
    this.router.navigateByUrl('/login')
    }
  }

  addToWishlist(p: Product) {

    //findWishlistbyUserId(Tempuser[0].id,p.id

      console.log(this.datatemp)
      var Tempuser = JSON.parse(localStorage.getItem('CurrentUser'));
      var user = new User();
      console.log("User : "+Tempuser[0].id)
      console.log("Prod : "+p.id)
      this.datatemp.forEach(e => {
        if(e.prod.id==p.id&&e.user.id==Tempuser[0].id)
        {
          console.log(this.datatemp)
          this.notifier.notify( 'error', "Your Product already added to your WishList !!" );
          this.tempwish=true;
        }
        else 
        {
          console.log("noooooo")
          if(Tempuser !=null  )
          {
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
            this.tempwish=false;
            if(!this.tempwish){
         console.log("hi to")
          this.Ws.addWishlist(w).subscribe(x => this.router.navigateByUrl('/wishlist')); 
        }
        }
          else
          {
            setTimeout(()=>{                      
              this.notifier.notify( 'error', "Please Log in before you add to your wishlist !!" );
         }, 500);
          this.router.navigateByUrl('/login')
        }
        }
      })

   
    
  }

  DoSearch() {
    console.log(this.search)
    if (this.search != '') {
        this.Ps.findProductbyAllCritere(this.search).subscribe(
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

  Filtered(e){
    var t=e.target.options[e.target.options.selectedIndex].value;
    if(t=='price-asc')
    {
      this.Ps.SortProductsByPrice('asc').subscribe(
        (data: Product[]) => {
          this.product = data;
          console.log(this.product)
        }); 
    }
    else if(t=='price-desc'){
      this.Ps.SortProductsByPrice('desc').subscribe(
        (data: Product[]) => {
          this.product = data;
          console.log(this.product)
        }); 
    }
    else if(t=='all-items')
    {
      this.Ps.getProducts().subscribe(
        (data: Product[]) => {
          this.product = data;
          console.log(this.product)
        });
    }
  }

}
