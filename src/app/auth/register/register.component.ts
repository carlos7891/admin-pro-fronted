import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name:['', [ Validators.required, Validators.minLength(3) ]],
    email:['', [ Validators.required, Validators.email ]],
    password:['', [ Validators.required, Validators.minLength(8) ]],
    password2:['', [ Validators.required, Validators.minLength(8) ]],
    terms:[false,[ Validators.required, Validators.requiredTrue]],
  },{
    validators: this.matchPasswords('password','password2')
  } as AbstractControlOptions
  );

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router:Router
  ) { }

  createUser(){
    this.formSubmitted = true;
    if(this.registerForm.invalid){
      return;
    }
    this.userService.createUser(this.registerForm.value).subscribe({
      next: resp => {
        console.log(resp)
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.error('Observer got an error: ' + err)
        Swal.fire('Error', err.error.msg, 'error')
      },
    })
  }

  validField( field:string ):boolean{
    if(this.registerForm.get(field)?.invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  confirmPassword(){
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    if(pass1 !== pass2 && this.formSubmitted){
      return true;
    }else {
      return false;
    }
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


}
