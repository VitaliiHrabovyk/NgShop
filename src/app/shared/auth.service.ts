import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

    login (user:any){
      return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.SetToken)
      )

  }

  private SetToken(response:any){
    if(response){
      const ExpData = new Date(new Date().getTime() + +response.expiresIn * 1000 )
      localStorage.setItem('fb-token-exp', ExpData.toString())
      localStorage.setItem('fb-token', response.idToken)
    
    }else {localStorage.clear()}
  }


  get token() {
    
    const ExpData = new Date(localStorage.getItem('fb-token-exp') || new Date().getTime()-3600 )

    if (new Date() > ExpData){
      this.logOut() 
      return null
    }
    return localStorage.getItem('fb-token')

  }


  logOut() {
    this.SetToken(null)
  }

  isAuthenicated(){
    return !!this.token;
  }

}
