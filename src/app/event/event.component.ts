import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from '../dataservice/data-service.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  uid=JSON.parse(localStorage.getItem("currentUid")||'')  
  event_array:any
  flag:boolean=false

  constructor(private router: Router, private ds: DataServiceService, private fb: FormBuilder) { 
    this.ds.event(this.uid).subscribe((result:any)=>{
      if(result){        
        this.event_array=result.event    
        if(this.event_array.length>0) 
        this.flag=true
        else
        this.flag=false      }
    },result=>alert(result.error.message))
    
  
  }

  chooseForm=this.fb.group({
    date:['']
  })

  ngOnInit(): void {
  }
  back(){
    this.router.navigateByUrl('dashboard')

  }
  deleteEvent(event:any){   
    this.ds.deleteEvent(this.uid,event).subscribe((result:any)=>{
      if(result){
        alert(result.message)
        window.location.reload()
      }
    },result=>alert(result.error.message))
  }
  editEvent(event:any,event_array:any){    
    // console.log(event);
    
    this.router.navigate(['dashboard', {my_object: JSON.stringify(event),index:event_array.indexOf(event)}])
  }
  date(){
    var date=this.chooseForm.value.date

    var newarray:any=this.event_array
    this.event_array=[]
    var array_=[]
    for(let i=0;i<newarray.length;i++){
      if(newarray[i].event_date==date)
      array_.push(newarray[i])
      this.event_array=array_
      if(this.event_array.length>0)
      this.flag=true
      else
      this.flag=false
    }

}
}
