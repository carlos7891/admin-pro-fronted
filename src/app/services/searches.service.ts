import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

  public baseUrl = environment.base_url;

  get token():string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token':this.token
      }
    }
  }

  transformUsers( results:any[] ):User[]{
    return results.map(
      user => new User(user.name, user.email, '' , user.img, user.google, user.role, user.uid)
    )
  }

  constructor(
    private http:HttpClient
  ) { }

  search( type:'users' |'doctors' | 'hospitals', term:string ){
    const url = `${this.baseUrl}/search/collection/${type}/${term}`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp:any) => {
          switch (type) {
            case 'users':
              return this.transformUsers(resp.result);
            case 'hospitals':
              return resp.result;
            case 'doctors':
              return resp.result;
            default:
              return [];
          }
        })
      );
  }

  globalSearch(term: string){
    const url = `${this.baseUrl}/search/${term}`;
    return this.http.get(url, this.headers);
  }
}
