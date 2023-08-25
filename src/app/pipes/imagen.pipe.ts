import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, type: 'users'|'doctors'|'hospitals'): string {
    if(img){
      return img.includes('https://') ? img : `${baseUrl}/upload/${type}/${img}`;
    }
    return `${baseUrl}/upload/${type}/no-image`;
  }

}
