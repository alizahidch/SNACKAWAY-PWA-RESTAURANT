import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'



@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  public regForm:any;
loginEmail;
loginPass;

  constructor(private formBuilder: FormBuilder,private auth:AuthService,private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {

    this.regForm=this.formBuilder.group({
      regemail:['', [Validators.required, Validators.email]],
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      regPass:['', [Validators.required, Validators.minLength(6)]]

      

     })
  }


  showSuccess() {
    this.toastr.success('Login Success!', 'Welcome!');
  }



  showError(){
    this.toastr.error('login failed', 'try again', {
      timeOut: 3000,
    });
  }
  checkForm(){
    console.log(this.regForm.value);
    this.auth.SignUp(this.regForm.value.regemail,this.regForm.value.regPass).then(res=>{
   let demoObj={
     uid:res.user.uid,
     email:this.regForm.value.regemail,
     firstName:this.regForm.value.firstName,
     lastName:this.regForm.value.lastName,
     status:"new",
     role:"restaurant"
   }
   
   this.auth.SetUserData(demoObj).then(res1=>{
    this.auth.SendVerificationMail();
    alert("account created");
    this.router.navigateByUrl("entry")
   }).catch(err1=>alert(err1))

    }).catch(err=>{
      alert(err);
    })
 
  }


  login(){
    console.log("login method called")
this.auth.SignIn(this.loginEmail,this.loginPass).then(res=>{
  this.showSuccess();
  this.router.navigate(['user-profile']);

}).catch(err=>{
this.showError();
})

  }

  
}
