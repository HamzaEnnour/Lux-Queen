import { Component, OnInit } from '@angular/core';
import { Wishlist } from '../model/wishlist';
import { WishlistService } from '../service/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist : Wishlist[]

  constructor(private Ws: WishlistService) { }

  ngOnInit(): void {
    this.Ws.getWishlists().subscribe(
      (data: any[]) => {
        this.wishlist = data;
      });   
  }
  Delete(c: number) {
    this.Ws.deleteWishlist(c).subscribe(res => {
      this.Ws.getWishlists().subscribe((data: any[]) => {
        this.wishlist = data;
       
      });
    });
  }

}
