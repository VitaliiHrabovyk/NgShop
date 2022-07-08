import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
import {Product} from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  create(product:any){
    
    return this.http.post(`${environment.fbDbUrl}/product.json`, product)
    .pipe(map((res:any) => {
      console.log(res);
      
      return {

        ...product,
        id: res.name,
        date: new Date(product.date)

      }
    }))
}


getAll(){

  return this.http.get(`${environment.fbDbUrl}/product.json`)
  .pipe(map(res => {
    return Object.keys(res)
    .map(key => ({
      ...res[key],
      id: key,
      date: new Date(res[key].date)
       }))

  }))
  
}


getById(id:string){

  return this.http.get(`${environment.fbDbUrl}/product/${id}.json`)
  .pipe(map((res:Product) => {
      return{
        ...res,
        id,
        date: res.date && new Date(res.date)
      }

  }))
  
}


delete(id:any) {
  return this.http.delete(`${environment.fbDbUrl}/product/${id}.json`)
}


update(product:Product) {
  return this.http.patch(`${environment.fbDbUrl}/product/${product.id}.json`, product)
}


}