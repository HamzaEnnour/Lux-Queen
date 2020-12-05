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
  
  user : User[];
  myForm : FormGroup;
  faReplyAll = faReplyAll;
  constructor(private fb: FormBuilder , private Us: UserServiceService, private router: Router) {
    let ff = new FormGroup({
      password : new FormControl('',[Validators.required,Validators.pattern(".{8,}")]),
      fullname : new FormControl('',Validators.required),
      login : new FormControl('',Validators.required),
      Rpassword : new FormControl('',[Validators.required,,Validators.pattern(".{8,}")]),
      email : new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z]*[.][a-zA-Z]*[@][a-zA-Z]{3}")])
    })
    this.myForm = this.fb.group(ff);
   }

  ngOnInit(): void {
    this.Us.getUsers().subscribe(
      (data: any[]) => {
        this.user = data;
      });
  }
get loginUser() { return this.myForm.get('login');}
get passwordUser() { return this.myForm.get('password');}
get RpasswordUser() { return this.myForm.get('Rpassword');}
get fullnameUser() { return this.myForm.get('fullname');}
get emailUser() { return this.myForm.get('email');}


addUser() {
  var user = new User();
  user.setFullName(this.myForm.value.fullname);
  user.setLogin(this.myForm.value.login);
  user.setEmail(this.myForm.value.email);
  user.setPassword(this.myForm.value.password);
  console.log(user);
   this.Us.addUser(user).subscribe (res => {
     alert('User created!');
     this.router.navigateByUrl('');
     });
 }
 Login(){
  this.Us.login(this.myForm.value.login,this.myForm.value.password).pipe(first()).subscribe(
    res => {
    alert('User Logged in!');
    this.router.navigateByUrl('/acceuil');
    },
    error => {
      alert('Check your field!');
    });
 }

cambiar_login(){
  document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";  
  document.querySelector<HTMLElement>('.cont_form_login').style.display = "block";
  document.querySelector<HTMLElement>('.cont_form_sign_up').style.opacity = "0";               
  
  setTimeout(function(){  document.querySelector<HTMLElement>('.cont_form_login').style.opacity = "1"; },400);  
    
  setTimeout(function(){    
  document.querySelector<HTMLElement>('.cont_form_sign_up').style.display = "none";
  },200); 
}
cambiar_sign_up() {
  document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
  document.querySelector<HTMLElement>('.cont_form_sign_up').style.display = "block";
document.querySelector<HTMLElement>('.cont_form_login').style.opacity = "0";
  
setTimeout(function(){  document.querySelector<HTMLElement>('.cont_form_sign_up').style.opacity = "1";
},100);  

setTimeout(function(){   document.querySelector<HTMLElement>('.cont_form_login').style.display = "none";
},400);  

}
ocultar_login_sign_up() {

  document.querySelector('.cont_forms').className = "cont_forms";  
  document.querySelector<HTMLElement>('.cont_form_sign_up').style.opacity = "0";               
  document.querySelector<HTMLElement>('.cont_form_login').style.opacity = "0"; 
  
  setTimeout(function(){
  document.querySelector<HTMLElement>('.cont_form_sign_up').style.display = "none";
  document.querySelector<HTMLElement>('.cont_form_login').style.display = "none";
  },500);  
    
}



}
