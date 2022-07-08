import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  create(order:any){
    
    return this.http.post(`${environment.fbDbUrl}/orders.json`, order)
    .pipe(map((res:any) => {
      console.log(res);
      
      return {

        ...order,
        id: res.name,
        date: new Date(order.date)

      }
    }))
}


getAll(){

  return this.http.get(`${environment.fbDbUrl}/orders.json`)
  .pipe(map(res => {
    return Object.keys(res)
    .map(key => ({
      ...res[key],
      id: key,
      date: new Date(res[key].date)
       }))

  }))
  
}




delete(id:any) {
  return this.http.delete(`${environment.fbDbUrl}/orders/${id}.json`)
}








}
