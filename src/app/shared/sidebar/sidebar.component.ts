import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems : any = [];
  public user!: User;

  constructor(
    private sideBarService: SidebarService,
    private userService: UserService,
  ) {
    this.user = userService.user!
   }

  ngOnInit(): void {
    this.menuItems = this.sideBarService.menu;
  }

}
