import { Component, OnInit } from '@angular/core';
import { Wishlist } from '../model/wishlist';
import { WishlistService } from '../shared/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist : Wishlist[]
  wishNumber: number;
  Tempuser = JSON.parse(localStorage.getItem('CurrentUser'));
  constructor(private Ws: WishlistService) { }

  ngOnInit(): void {
    
    this.Ws.getWishlists().subscribe(
      (data: Wishlist[]) => {
        this.wishlist = data.filter(x=>x.user.id==this.Tempuser[0].id);
      });   
  }
  Delete(c: number) {
    this.Ws.deleteWishlist(c).subscribe(res => {
      this.Ws.getWishlists().subscribe(
        (data: Wishlist[]) => {
          this.wishlist = data.filter(x=>x.user.id==this.Tempuser[0].id);
          if(data.length==0)
        this.wishNumber=0;

        this.wishNumber=data.length
        });  
    });

  }

}
