import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { UpdateForm } from '../interfaces/update-form.interface';
import { UsersResponse } from '../interfaces/response-users.interfaces';
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

  get uid():string {
    return this.user.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token':this.token
      }
    }
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
    if(!formData.password){
      delete formData.password;
    }
    return this.http.put(`${this.baseUrl}/users/${this.user.uid}`, formData, this.headers)
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
      google.accounts.id.revoke(this.user.email, () => {})
    }
    this.router.navigateByUrl('/login');
  }

  getUsers( from: number = 0 ){
    const url = `${this.baseUrl}/users?from=${from}`;
    return this.http.get<UsersResponse>(url, this.headers)
        .pipe(
          map( resp => {
            const users = resp.users.map(
              user => new User(user.name, user.email, '' , user.img, user.google, user.role, user.uid))
            return {
              users: users,
              total: resp.total
            };
          })
        )
  }

  deleteUser(user: User){
    const url = `${this.baseUrl}/users/${user.uid}`;
    return this.http.delete<UsersResponse>(url, this.headers)
  }

  updateUserData(user: User){
    return this.http.put(`${this.baseUrl}/users/${user.uid}`, user, this.headers)
  }



}
