import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const options = {
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }

  //appending token to request header
  getOptions() {
    const token = localStorage.getItem('token')
    let headers = new HttpHeaders()
    if (token) {
      headers = headers.append('access-token', token)
      options.headers = headers
    }
    return options
  }



  //register
  register(username: any, uid: any, password: any) {
    const data = {
      username,
      uid,
      password
    }
    //asynchronous
    return this.http.post('http://localhost:3000/register', data)
  }

  //login
  login(uid: any, pswd: any) {
    const data = {
      uid,
      pswd
    }
    //asynchronous
    return this.http.post('http://localhost:3000/login', data)
  }

  //event
  event(uid: any) {
    const data = {
      uid
    }
    //asynchronous
    return this.http.post('http://localhost:3000/event', data, this.getOptions())
  }
  addEvent(uid: any, date: any, event: any) {
    const data = ({
      uid, date, event
    })
    return this.http.post('http://localhost:3000/addEvent', data, this.getOptions())

  }
  deleteEvent(uid: any, index: any) {
    const data = ({
      uid, index
    })
    return this.http.post('http://localhost:3000/deleteEvent', data, this.getOptions())
  }
  deleteAcc(uid: any) {
    return this.http.delete('http://localhost:3000/deleteAcc/' + uid, this.getOptions())
  }
  updatevent(uid: any, index: any, event_id: any, date: any, event: any) {

    const data = ({
      uid, index, event_id, date, event
    })
    return this.http.post('http://localhost:3000/updateEvent', data, this.getOptions())
  }


}
