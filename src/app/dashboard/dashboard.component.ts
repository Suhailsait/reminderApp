import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../dataservice/data-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  user: any
  date: any
  event: any
  event_data: any
  event_id: any
  currentDate: any
  btn_name: any
  index: any

  

  constructor(private router: Router, private ds: DataServiceService, private fb: FormBuilder, private ar: ActivatedRoute) {
    //  console.log(this.ar.snapshot.paramMap.get('my_object'));
    // console.log(this.ar.snapshot.paramMap.get('index'));
    this.user = localStorage.getItem('currentUser')
    this.currentDate = new Date().toISOString().slice(0, 10);
    if (this.ar.snapshot.paramMap.get('my_object') == null) {
      this.btn_name = "Add"
    }
    else {
      this.event_data = JSON.parse(this.ar.snapshot.paramMap.get('my_object') || '')
      this.index = this.ar.snapshot.paramMap.get('index')
      this.btn_name = "Update"
      this.event = this.event_data.event_desc
      this.date = this.event_data.event_date
      this.event_id = this.event_data.event_id
    }

  }
  
  eventForm = this.fb.group({
    date: ['', [Validators.required]],
    event: ['', [Validators.required]]
  })

  ngOnInit(): void {
    if(!localStorage.getItem("token")){
      alert("Please login")
      this.router.navigateByUrl('')
    }
  }

  addEvent() {
    var date:any = this.eventForm.value.date
    var event = this.eventForm.value.event
    console.log("re"+date);


    if (this.eventForm.valid) {
      if(date >= this.currentDate) {
        var uid = localStorage.getItem('currentUid')
        if (this.btn_name == 'Add') {
          this.ds.addEvent(uid,date,event)
          .subscribe((result: any) => {
            if (result) {
              alert(result.message)
              this.router.navigateByUrl('event')
            }
          }, result => alert(result.error.message))
        } else {
          this.ds.updatevent(uid, this.index, this.event_id,date,event)
          .subscribe((result: any) => {
            if (result) {
              alert(result.message)
              this.router.navigateByUrl('event')
            }
          }, 
          result => alert(result.error.message))
        }
      }
      else {
        alert("Invalid date")
      }
    }
    else {
      alert("Invalid form")
    }
  }

  viewEvent() {
    this.router.navigateByUrl('event')
  }

  deleteAcc(){
    this.router.navigateByUrl('deleteacc')
  }
  logout(){
    localStorage.removeItem("currentUid")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("token")
    this.router.navigateByUrl("")
  }

}
