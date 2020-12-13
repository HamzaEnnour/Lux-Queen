import { User } from './../model/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faFeather, faReplyAll } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { UserServiceService } from '../shared/user-service.service';
import { first } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user : User;
  myForm : FormGroup;
  private notifier: NotifierService;


  constructor(private fb: FormBuilder , private Us: UserServiceService, private router: Router,notifier: NotifierService) {
    this.notifier = notifier;
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
      console.log
      if (this.myForm.valid) {
        localStorage.setItem('CurrentUser', JSON.stringify(this.user));
        this.notifier.notify( 'success', "User Logged in Succefully" );
    this.router.navigateByUrl('/');
      }
      else {
        this.notifier.notify( 'error', "Check your field!" );
      }
    },
    error => {
      
    });
 }



}
