import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DoctorsResponse } from '../interfaces/response-doctors.interface';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

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
  ) { }

  getDoctors( from: number = 0 ){
    const url = `${this.baseUrl}/doctors?from=${from}`;
    return this.http.get<DoctorsResponse>(url, this.headers);
  }

  createDoctor( formData:any ){
    const url = `${this.baseUrl}/doctors`;
    return this.http.post(url, formData, this.headers);
  }

  updateDoctor( _id:string, formData:any ){
    const url = `${this.baseUrl}/doctors/${_id}`;
    return this.http.put(url, formData, this.headers);
  }

  deleteDoctorr(doctor: Doctor){
    const url = `${this.baseUrl}/doctors/${doctor._id}`;
    return this.http.delete(url, this.headers)
  }

  getDoctorById(_id: string){
    const url = `${this.baseUrl}/doctors/${_id}`;
    return this.http.get(url, this.headers)
  }

}
