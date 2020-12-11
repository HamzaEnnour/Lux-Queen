import { Product } from './../model/product';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product : Product[];

  constructor(private Ps: ProductService, private router: Router) { }

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

}
