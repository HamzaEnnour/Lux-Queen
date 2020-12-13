import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../model/cart';
import { Wishlist } from '../model/wishlist';
import { CartService } from '../shared/cart.service';
import { UserServiceService } from '../shared/user-service.service';
import { WishlistService } from '../shared/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cart: Cart[];
 wishlist : Wishlist[]
  ss:string;
  @Input() cartnumber: number;
  @Input() wishnumber: number;
  @Output() SearchAction= new EventEmitter<String>();


  Tempuser = JSON.parse(localStorage.getItem('CurrentUser'));

  constructor(private Us: UserServiceService,private Cs : CartService,private Ws: WishlistService,private router: Router,private _route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.Tempuser!=null){
    this.Cs.getCarts().subscribe(
      (data: Cart[]) => {
        this.cart = data.filter(x=>x.user.id==this.Tempuser[0].id);
        if(data==null)
          this.cartnumber=0;

        this.cartnumber=data.length
      });
      this.Ws.getWishlists().subscribe(
        (data: Wishlist[]) => {
          this.wishlist = data.filter(x=>x.user.id==this.Tempuser[0].id);
          if(data==null)
          this.wishnumber=0;

          this.wishnumber=data.length
        });
      }
  }
  
  isLogged(): boolean {
    return this.Us.isLoggedin();
 }
 DoLogOut() {
   this.Us.logout();
 }
 DoSearch() {
    this.SearchAction.emit(this.ss);
 }

}
