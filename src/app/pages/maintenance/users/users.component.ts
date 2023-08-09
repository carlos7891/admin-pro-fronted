import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SearchesService } from 'src/app/services/searches.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { ModalImageService } from '../../../services/modal-image.service';
import { Subscription, delay } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers: number = 0;
  public users: User[] =[];
  public usersTemp: User[] =[];
  public from: number = 0;
  public loading: boolean = true;
  public imgSubs!: Subscription;

  constructor(
    private userService: UserService,
    private searchService: SearchesService,
    private modalImageService:ModalImageService,
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.imgSubs = this.modalImageService.newImage
      .pipe(
        delay(100)
      )
      .subscribe({
        next:() =>this.getAllUsers()
      })
  }

  ngOnDestroy(): void {
      this.imgSubs.unsubscribe();
  }

  getAllUsers(){
    this.loading = true;
    this.userService.getUsers(this.from).subscribe({
      next:({total, users}) =>{
        this.totalUsers = total;
        this.users = users;
        this.usersTemp = users;
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

  search(term:string){
    if(term.length === 0){
      this.users = this.usersTemp;
    }else{
      this.searchService.search('users', term)
        .subscribe({
          next:(resp)=>{
            this.users = resp;
          }
        })
    }
  }

  deleteUser(user:User){
    if( user.uid === this.userService.uid ){
      Swal.fire(
        'Error',
        'Can not delete this user',
        'error'
      )
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(user)
            .subscribe({
              next:() => {
                this.getAllUsers()
                Swal.fire(
                  'Deleted!',
                  `${user.name} has been deleted.`,
                  'success'
                )
              }
            })
        }
      })
    }
  }

  changeRole(user: User){
    this.userService.updateUserData(user)
      .subscribe({
        next:(resp) => console.log(resp)
      })
  }

  openModal(user: User){
    this.modalImageService.openModal("users", user.uid!, user.img);
  }

}
