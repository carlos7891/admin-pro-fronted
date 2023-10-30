import { environment } from "src/environments/environment"

const baseUrl = environment.base_url;

export class User {

  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: 'ADMIN_ROLE' |'USER_ROLE',
    public uid?: string
  ){ }

  get imageUrl(){
    if(this.img){
      return this.img.includes('https://') ? this.img : `${baseUrl}/upload/users/${this.img}`;
    }
    return `${baseUrl}/upload/users/no-image`;
  }
}
