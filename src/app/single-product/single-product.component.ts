import { Product } from './../model/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { FormControl, FormGroup } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  product : Product;
  myForm: FormGroup;
  id : string;
  desc:string;
  name:string;
  price:string;
  quan:string;
  img:string;
  ability:string;


  constructor(private Ps: ProductService, private router: Router,private idd: ActivatedRoute) {

   }

  ngOnInit(): void {

    this.idd.paramMap.subscribe(params => {this.id = params.get('id');});

    this.Ps.findProductbyId(parseInt(this.id)).subscribe(
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
    $('.pro-qty').prepend('<span class="dec qtybtn">-</span>');
    $('.pro-qty').append('<span class="inc qtybtn">+</span>');
    $('.qtybtn').on('click', function() {  
      var $button = $(this);
      var oldValue = $button.parent().find('input').val();
      if ($button.hasClass('inc')) {
        if(oldValue < data.quantity)
        var newVal = parseFloat(oldValue) + 1;
        else
        newVal = parseFloat(data.quantity);
      } else {
        if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
        } else {
        newVal = 0;
        }
        }
      $button.parent().find('input').val(newVal);
    }); 
   /* this.myForm.patchValue({
      username: this.user.username,
      name: this.user.name,
      mail: this.user.email,
    });*/
      }
    );
     
  }


}
