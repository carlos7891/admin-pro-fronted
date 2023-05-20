import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { UpdateForm } from '../interfaces/update-form.interface';
declare const google:any;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public baseUrl = environment.base_url;
  public user: User = new User('', '');

  get token():string {
    return localStorage.getItem('token') || '';
  }

  constructor(
    private http:HttpClient,
    private router: Router
    ) { }

  createUser( formData: RegisterForm){
    return this.http.post(`${this.baseUrl}/users`, formData)
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token )
        })
      )
  }

  updateProfile(formData: UpdateForm){
    console.log(formData)
    if(!formData.password){
      console.log(formData.password)
      delete formData.password;
    }
    return this.http.put(`${this.baseUrl}/users/${this.user.uid}`, formData,{
      headers: {
        'x-token':this.token
      }
    })
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
    if (this.token === ''){
      return of(false)
    }
    return this.http.get(`${this.baseUrl}/login/renew`, {
      headers: {
        'x-token':this.token
      }
    }).pipe(
        map( (resp: any) => {
          const {name, email, role, google, img, uid } = resp.user
          this.user = new User(name, email, '', img, google, role, uid)
          localStorage.setItem('token', resp.token )
          if (resp.ok){
            return true
          }
          return false
        }),
        catchError((err) =>{
          console.log(err)
          return of(false)
        })
    )
  }

  logout(){
    localStorage.removeItem('token');
    if(this.user.google){
      console.log('outgoogle')
      google.accounts.id.revoke(this.user.email, () => {})
    }
    this.router.navigateByUrl('/login');
  }


}
