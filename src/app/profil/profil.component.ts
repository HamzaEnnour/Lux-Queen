import { User } from './../model/user';
import { Router } from '@angular/router';
import { UserServiceService } from './../service/user-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user : User;
  filename: string ;
  login: string;
  password:string;
  fullname:string;
  email:string;
  myForm : FormGroup;
  tempId : number;

  constructor(private fb: FormBuilder , private Us: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    var Tempuser = JSON.parse(localStorage.getItem('CurrentUser'));
    this.tempId=Tempuser[0].id;
    this.login=Tempuser[0].login;
    this.fullname=Tempuser[0].full_name;
    this.email=Tempuser[0].email;
    this.filename=Tempuser[0].image;
    this.password=Tempuser[0].password;

    this.myForm = new FormGroup({
      password : new FormControl('',[Validators.required,Validators.pattern(".{8,}")]),
      fullname : new FormControl('',Validators.required),
      login : new FormControl('',Validators.required),
      image : new FormControl('',Validators.required),
      Rpassword : new FormControl('',[Validators.required,Validators.pattern(".{8,}")]),
      email : new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
    })
  }
  get loginUser() { return this.myForm.get('login');}
get imageUser() { return this.myForm.get('image');}
get passwordUser() { return this.myForm.get('password');}
get RpasswordUser() { return this.myForm.get('Rpassword');}
get fullnameUser() { return this.myForm.get('fullname');}
get emailUser() { return this.myForm.get('email');}

updateUser()
{ 
  var userr = new User();
  userr.setFullName(this.fullnameUser.value);
  userr.setLogin(this.loginUser.value);
  userr.setImage(this.filename)
  userr.setEmail(this.emailUser.value);
  userr.setPassword(this.passwordUser.value);
  this.Us.updateUser(this.tempId, userr).subscribe(res => {
alert('User Updated')
this.router.navigateByUrl('/acceuil');
    });
}

UpdateImage() {
  var pieces = this.imageUser.value.split('\\');
  this.filename = pieces[pieces.length-1];
 }


}
