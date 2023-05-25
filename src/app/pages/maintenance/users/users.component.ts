import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SearchesService } from 'src/app/services/searches.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  public totalUsers: number = 0;
  public users: User[] =[];
  public from: number = 0;
  public loading: boolean = true;

  constructor(
    private userService: UserService,
    private searchService: SearchesService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.loading = true;
    this.userService.getUsers(this.from).subscribe({
      next:({total, users}) =>{
        this.totalUsers = total;
        this.users = users;
        this.loading = false;
      }
    })
  }

  changePage( value: number){
    this.from += value;
    if(this.from < 0){
      this.from = 0;
    }else if( this.from > this.totalUsers){
      this.from -= value;
    }
    this.getAllUsers();
  }

  searchUser(term:string){
    console.log(term)
  }

}
