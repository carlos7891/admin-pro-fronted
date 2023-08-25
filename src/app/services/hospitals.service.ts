import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HospitalsResponse } from '../interfaces/response-hospitals.interface';

@Injectable({
  providedIn: 'root'
})
export class HospitalsService {

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
    private http: HttpClient,
    private router: Router
  ) { }

  getHospitals( from: any = 0 ){
    const url = `${this.baseUrl}/hospitals?from=${from}`;
    return this.http.get<HospitalsResponse>(url, this.headers);
  }

  createHospital( name:string ){
    const url = `${this.baseUrl}/hospitals`;
    return this.http.post(url, {name}, this.headers);
  }

  updateHospital( _id:string, name:string ){
    const url = `${this.baseUrl}/hospitals/${_id}`;
    return this.http.put(url, {name}, this.headers);
  }

  deleteHospital( _id:string ){
    const url = `${this.baseUrl}/hospitals/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
