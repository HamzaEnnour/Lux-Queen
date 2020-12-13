import { CartService } from '../shared/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart } from '../model/cart';
import * as $ from 'jquery';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart[]
  tot:number=0;
  Cnumber: number;
  Tempuser = JSON.parse(localStorage.getItem('CurrentUser'));
  

  constructor(private Cs: CartService) { 
   
      
  }

  ngOnInit(): void {

    this.Cs.getCarts().subscribe(
      (data: any[]) => {
        this.cart = data.filter(x=>x.user.id==this.Tempuser[0].id);
        this.cart.forEach(e=>{this.tot+=e.total})
      });   
  }
  OnCh(a: number, b: number) {

  }
  Delete(c: number) {
    this.Cs.deleteCart(c).subscribe(res => {
      this.Cs.getCarts().subscribe((data: any[]) => {
        this.cart = data.filter(x=>x.user.id==this.Tempuser[0].id);
        if(data.length==0)
        this.Cnumber=0;

        this.Cnumber=data.length
       
      });
               });
  }

}
