import { User } from './../model/user';
import { Router } from '@angular/router';
import { UserServiceService } from '../shared/user-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user : User[];
  filename: string ="Choose your image";
  myForm : FormGroup;
  private notifier: NotifierService;

  constructor(private fb: FormBuilder , private Us: UserServiceService, private router: Router,notifier: NotifierService) { 
    this.notifier = notifier; 
  }

  ngOnInit(): void {
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

addUser() {
  var user = new User();
  user.setFullName(this.fullnameUser.value);
  user.setLogin(this.loginUser.value);

  user.setImage(this.filename)
  user.setEmail(this.emailUser.value);
  user.setPassword(this.passwordUser.value);
  console.log(user);
  if (this.myForm.valid) {
   this.Us.addUser(user).subscribe (res => {
  
      this.notifier.notify( 'success', "User created Succefully" );
     this.router.navigateByUrl('/login');
    }
    
     );
  }
  else
  this.notifier.notify( 'error', "Check your field!" );
 }
 UpdateImage(event) {
  var pieces = this.imageUser.value.split('\\');
  this.filename = pieces[pieces.length-1];
 }
 

}
