import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from '../dataservice/data-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm=this.fb.group({
    uid:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]]
  })

  constructor(private router:Router,private ds:DataServiceService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  register(){
    var uname=this.registerForm.value.uname
    var uid=this.registerForm.value.uid
    var pswd=this.registerForm.value.pswd

  if (this.registerForm.valid){
    this.ds.register(uname,uid,pswd)
    .subscribe((result:any)=>{
      if (result) {
        alert(result.message)
        this.router.navigateByUrl("")
      }
    },
    result=>{
      alert(result.error.message);
    }
      )
    }
  else{
    alert("Invalid Form")
  }
  }
}
