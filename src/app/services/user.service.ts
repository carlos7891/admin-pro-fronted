import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
declare const google:any;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public baseUrl = environment.base_url;

  constructor( private http:HttpClient) { }

  createUser( formData: RegisterForm){
    return this.http.post(`${this.baseUrl}/users`, formData)
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token )
        })
      )
  }

  login( formData: LoginForm){
    return this.http.post(`${this.baseUrl}/login`, formData)
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token )
        })
      )
  }

  loginGoogle(token:string) {
    return this.http.post(`${this.baseUrl}/login/google`, {token})
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token )
          localStorage.setItem('email', resp.email )
        })
      )
  }

  renewToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    if (token === ''){
      return of(false)
    }
    return this.http.get(`${this.baseUrl}/login/renew`, {
      headers: {
        'x-token':token
      }
    }).pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token )
        }),
        map((resp:any) => {
          if (resp.ok){
            return true
          }
          return false
        }),
        catchError((_err) => of(false))
    )
  }

  logout(){
    localStorage.removeItem('token');
    const email = localStorage.getItem('email' || '');
    if(email){
      google.accounts.id.revoke(email, () => {
        localStorage.removeItem('email');
      })
    }
  }


}
