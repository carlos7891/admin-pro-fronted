import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {
  private _hideModal: boolean = true;
  private base_url = environment.base_url;
  public type!: 'users' | 'hospitals' | 'doctors';
  public id: string = '';
  public img: string = '';
  public newImage: EventEmitter<string> = new EventEmitter<string>();

  get hideModal(){
    return this._hideModal;
  }

  openModal(
    type:'users' | 'hospitals' | 'doctors',
    id: string,
    img: string = 'no-img'
  ){
    this._hideModal = false;
    this.type = type;
    this.id = id;
    if(img.includes('https')){
      this.img = img;
    }else{
      this.img = `${this.base_url}/upload/${type}/${img}`;
    }
  }

  closeModal(){
    this._hideModal = true;
  }

  constructor() { }
}
