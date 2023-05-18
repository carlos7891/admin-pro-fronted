import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  logout(){
    this.userService.logout();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Logout Success',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigateByUrl('/login')
  }

}
