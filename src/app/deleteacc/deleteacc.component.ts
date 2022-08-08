import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from '../dataservice/data-service.service';

@Component({
  selector: 'app-deleteacc',
  templateUrl: './deleteacc.component.html',
  styleUrls: ['./deleteacc.component.css']
})
export class DeleteaccComponent implements OnInit {

  uid=localStorage.getItem("currentUid")


  constructor(private router:Router,private fb:FormBuilder,private ds:DataServiceService) { }

  ngOnInit(): void {
    if(!localStorage.getItem("token")){
      alert("Please login")
      this.router.navigateByUrl('')
    }
  }

  deleteForm=this.fb.group({
    uid:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]]
  })
  logout(){
    localStorage.removeItem("currentUid")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("token")
    this.router.navigateByUrl("")
  }
  deleteAcc(){
    var del_uid=this.deleteForm.value.uid
    if(this.deleteForm.valid){
      if(del_uid==this.uid){
        this.ds.deleteAcc(this.uid).subscribe((result:any)=>{
          if(result){
            alert(result.message)
            this.logout()
          }
        },result=>alert(result.error.message))
      }else{
        alert("Invalid user Id")
      }
    }else{
      alert("Invalid form")
    }
  }

  back(){
    this.router.navigateByUrl('dashboard')

  }
}
