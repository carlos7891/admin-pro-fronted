import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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

  constructor(
    private http:HttpClient
  ) { }

  search( type:'users' |'doctors' | 'hospitals', term:string ){
    const url = `${this.baseUrl}/search/collection/${type}/${term}`;
    return this.http.get(url, this.headers)
  }
}
