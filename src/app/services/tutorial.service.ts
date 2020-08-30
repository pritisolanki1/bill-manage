import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/tutorials';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  private data: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  data$: Observable<any> = this.data.asObservable();
  private seldata: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  seldata$: Observable<any> = this.seldata.asObservable();
  // currentTutorial = new BehaviorSubject<any>('');
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }
  getAllWithFilter(data) {
    return this.http.get(baseUrl, data);
  }
   getAllYear() {
    return this.http.get(baseUrl+'/allyear');
  }
  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data) {
    return this.http.post(baseUrl, data);
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }

  findByTitle(cust_name,selYear,selMonth) 
  {
    console.log("custm:"+cust_name+" "+selYear+" "+selMonth);
    // return this.http.get(`${baseUrl}?cust_name=${cust_name}`);
    return this.http.get(`${baseUrl}`+`/withFilter?cust_name=${cust_name}&datey=${selYear}&datem=${selMonth}`);
  }
   setNewUserInfo(newData) {
    // this.currentTutorial.next(user);
    this.data.next(newData);
  }

  getNewUserInfo() {
    return this.data.asObservable();
  }
}
