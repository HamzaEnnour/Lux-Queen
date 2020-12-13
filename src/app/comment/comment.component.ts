import { Product } from './../model/product';
import { CommentService } from '../shared/comment.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { User } from '../model/user';
import { Comment } from '../model/comment';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  desc:string;
  name:string;
  price:string;
  quan:string;
  img:string;
  idUser:number;
  Today = new Date();
@Input() Com : Comment[];
@Input() selected:number;


  constructor(private Ps: ProductService,private Cs: CommentService) { }

  ngOnInit(): void {
    var Tempuser = JSON.parse(localStorage.getItem('CurrentUser'));
    this.idUser= Tempuser[0].id;
this.Cs.getComments().subscribe(
    (data: Comment[]) => {
      this.Com = data.filter(x=>x.prod.id==this.selected);
      console.log(this.Com)
    });
}

Delete(i :number) {
  this.Cs.deleteComment(i).subscribe(res => {
    this.Cs.getComments().subscribe(
      (data: Comment[]) => {
        this.Com = data.filter(x=>x.prod.id==this.selected);
      });
             });
}
 

}
