import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  public base_url = environment.base_url;

  get token():string {
    return localStorage.getItem('token') || '';
  }

  constructor(
    private http:HttpClient,
  ) { }

  updateImage(
    file:File,
    type: 'users' | 'doctors' | 'hospitals',
    uid: string | undefined
  ){
      const url = `${ this.base_url }/upload/${type}/${uid}`;
      const formData = new FormData();
      formData.append('image', file);
      return this.http.put(url, formData, {
        headers: {
          'x-token': this.token
        }
      })
    }
}
