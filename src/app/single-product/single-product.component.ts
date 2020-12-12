import { CartService } from './../service/cart.service';
import { Product } from './../model/product';
import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { FormControl, FormGroup } from '@angular/forms';
import * as $ from 'jquery';
import { User } from '../model/user';
import { Comment } from '../model/comment';
import { CommentService } from '../service/comment.service';
import { Cart } from '../model/cart';
import { WishlistService } from '../service/wishlist.service';
import { Wishlist } from '../model/wishlist';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  product : Product;
  myForm: FormGroup;
 
  desc:string;
  name:string;
  price:string;
  quan:string;
  img:string;
  ability:string;
  description:string;
  temp:string;
  Comm :Comment[];



  constructor(private Ps: ProductService,private Cs: CommentService,private Css: CartService,private Ws:WishlistService, private router: Router,private idd: ActivatedRoute) {

   }
 
  ngOnInit(): void {

    this.idd.paramMap.subscribe(params => {this.temp = params.get('id');});

    this.Ps.findProductbyId(parseInt(this.temp)).subscribe(
      (data: any) => {

    this.desc=data.description;
    this.name=data.name;
    this.price=data.price;
    this.quan=data.quantity;
    this.img=data.image;

    console.log(data.quantity)
    if(data.quantity!=0)
    this.ability="In Stock";
    else
    this.ability="Out Of Stock"

    /////////////////
   
   /* this.myForm.patchValue({
      username: this.user.username,
      name: this.user.name,
      mail: this.user.email,
    });*/
      }
    );
     
  }
  addComment() {
    var Tempuser = JSON.parse(localStorage.getItem('CurrentUser'));
    var user = new User();
    user.setId(Tempuser[0].id);
    user.setFullName(Tempuser[0].full_name);
    user.setLogin(Tempuser[0].login);
    user.setImage(Tempuser[0].image)
    user.setEmail(Tempuser[0].email);
    user.setPassword(Tempuser[0].password);
    /////
    
    var prod = new Product();
    prod.setId(parseInt(this.temp));
    prod.setName(this.name);
    prod.setQuantity(parseInt(this.quan));
    prod.setPrice(parseInt(this.price));
    prod.setDescription(this.desc);
    //////
    var comment= new Comment();
    comment.setDescription(this.description);
    comment.setUser(user);
    comment.setProduct(prod);

     this.Cs.addComment(comment).subscribe();

       this.Cs.getComments().subscribe(
        (data: Comment[]) => {
          this.Comm = data.filter(x=>x.prod.id==parseInt(this.temp));
        });
   }

   addToCart() {
    var Tempuser = JSON.parse(localStorage.getItem('CurrentUser'));
    var user = new User();
    user.setId(Tempuser[0].id);
    user.setFullName(Tempuser[0].full_name);
    user.setLogin(Tempuser[0].login);
    user.setImage(Tempuser[0].image)
    user.setEmail(Tempuser[0].email);
    user.setPassword(Tempuser[0].password);
    /////

    var pp = new Product();
    pp.setId(parseInt(this.temp));
    pp.setName(this.name);
    pp.setImage(this.img)
    console.log(parseInt(this.quan))
    pp.setQuantity(parseInt(this.quan));
    pp.setPrice(parseInt(this.price));
    pp.setDescription(this.desc);
    /////
    var c= new Cart();
    c.setTotal(parseInt(this.quan)*pp.price)
    c.setQuantity(pp.quantity)
    c.setUser(user)
    c.setProd(pp)
    this.Css.addCart(c).subscribe(x =>this.router.navigateByUrl('/cart'));
  }

  addToWishlist() {
    var Tempuser = JSON.parse(localStorage.getItem('CurrentUser'));
    var user = new User();
    user.setId(Tempuser[0].id);
    user.setFullName(Tempuser[0].full_name);
    user.setLogin(Tempuser[0].login);
    user.setImage(Tempuser[0].image)
    user.setEmail(Tempuser[0].email);
    user.setPassword(Tempuser[0].password);
    /////

    var pp = new Product();
    pp.setId(parseInt(this.temp));
    pp.setName(this.name);
    pp.setImage(this.img)
    console.log(parseInt(this.quan))
    pp.setQuantity(parseInt(this.quan));
    pp.setPrice(parseInt(this.price));
    pp.setDescription(this.desc);
    /////
    var w= new Wishlist();
    w.setQuantity(pp.quantity)
    w.setUser(user)
    w.setProd(pp)
    this.Ws.addWishlist(w).subscribe(x =>this.router.navigateByUrl('/wishlist'));
  }
   

}
