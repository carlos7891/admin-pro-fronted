import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user!: User;
  public formSubmitted = false;
  public profileForm: FormGroup = this.fb.group({
    name:['', Validators.required],
    email:['',[ Validators.required, Validators.email]],
    password:[null],
    password2:[null],
  })

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm.patchValue({
      name:this.user.name,
      email: this.user.email
    })
  }

  updateProfile(){
    this.formSubmitted = true;
    if(this.profileForm.invalid){
      return;
    }
    this.userService.updateProfile(this.profileForm.value).subscribe({
      next: (resp: any) => {
        console.log(resp)
        this.logingMessage(resp.msg);
      },
      error: err => {
        console.error('Observer got an error: ' + err)
        Swal.fire('Error', err.error.msg, 'error')
      },
    })
  }

  confirmPassword(){
    const pass1 = this.profileForm.get('password')?.value;
    const pass2 = this.profileForm.get('password2')?.value;
    if(pass1 !== pass2 && this.formSubmitted){
      return true;
    }else {
      return false;
    }
  }

  validField( field:string ):boolean{
    if(this.profileForm.get(field)?.invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  logingMessage(resp:string){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: resp,
      showConfirmButton: false,
      timer: 1500
    })
  }

}
