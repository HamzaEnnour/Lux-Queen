import { User } from './../model/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faFeather, faReplyAll } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { UserServiceService } from '../service/user-service.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user : User;
  myForm : FormGroup;
  constructor(private fb: FormBuilder , private Us: UserServiceService, private router: Router) {
    this.myForm = new FormGroup({
      password : new FormControl('',[Validators.required,Validators.pattern(".{8,}")]),
      login : new FormControl('',Validators.required)
    })
   }

  ngOnInit(): void {

  }
get loginUser() { return this.myForm.get('login');}
get passwordUser() { return this.myForm.get('password');}


 Login(){
  this.Us.login(this.loginUser.value,this.passwordUser.value).pipe(first()).subscribe(
    res => {
      this.user=res;
      console.log(this.user)
      if (Object.keys(this.user).length > 0) {
        localStorage.setItem('CurrentUser', JSON.stringify(this.user));
    alert('User Logged in!');
      }
      else {
        alert('Check your field!');
      }
    },
    error => {
      
    });
 }



}
