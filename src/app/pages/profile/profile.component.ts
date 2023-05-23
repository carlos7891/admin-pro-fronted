import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
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
  public file!: File;
  public imagePreview!:string | null;

  public profileForm: FormGroup = this.fb.group({
    name:['', Validators.required],
    email:['',[ Validators.required, Validators.email]],
    password:[null],
    password2:[null],
  },{
    validators: this.matchPasswords('password','password2')
  } as AbstractControlOptions)

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileService: FileUploadService
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm.patchValue({
      name:this.user.name,
      email: this.user.email
    })
    if(this.user.google){
      this.profileForm.controls['email'].disable();
      this.profileForm.controls['password'].disable();
      this.profileForm.controls['password'].disable();
    }
  }

  updateProfile(){
    this.formSubmitted = true;
    if(this.profileForm.invalid){
      return;
    }
    this.userService.updateProfile(this.profileForm.getRawValue()).subscribe({
      next: (resp: any) => {
        this.logingMessage(resp.msg);
        this.user.name = resp.userUpdated.name;
        this.user.email = resp.userUpdated.email;
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

  matchPasswords(pass1:string, pass2:string){
    return( formGroup:FormGroup ) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if( pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null)
      }else{
        pass2Control?.setErrors({ notEqual:true})
      }
    }
  }

  changeImage(files:any){
    if (!files.files[0]){
      this.imagePreview  = null;
      return
    }
    this.file = files.files[0];
    const reader = new FileReader();
    reader.onload = () => (this.imagePreview = reader.result as string);
    reader.readAsDataURL(this.file);
  }

  uploadImage(){
    this.fileService.updateImage(this.file, 'users', this.user.uid).subscribe({
      next: (resp:any) =>{
        this.logingMessage(resp.msg);
        this.user.img = resp.file;
      },
      error: err => {
        console.error('Observer got an error: ' + err)
        Swal.fire('Error', err.error.msg, 'error')
      },
    })
  }

}
