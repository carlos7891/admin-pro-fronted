import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

declare const google:any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})
export class LoginComponent implements AfterViewInit {

  public formSubmitted = false;
  @ViewChild('googleBtn') googleBtn!:ElementRef

  public loginForm = this.fb.group({
    email:[localStorage.getItem('email') || '', [ Validators.required, Validators.email ]],
    password:['', [ Validators.required, Validators.minLength(4) ]],
    remember:[ localStorage.getItem('remember') || false ]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngAfterViewInit(): void {
    this.googleInit()
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "764109450647-u8s76uv1bk55hje4stdr7tin6oqrdluk.apps.googleusercontent.com",
      callback: (response:any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any){
    this.userService.loginGoogle(response.credential).subscribe({
      next: resp => {
        this.logingMessage(resp.msg);
        this.router.navigateByUrl('/dashboard');
      }
    })
  }

  login(){
    this.formSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.userService.login(this.loginForm.value).subscribe({
      next: resp => {
       this.logingMessage(resp.msg);
        if (this.loginForm.get('remember')?.value){
          localStorage.setItem('email', this.loginForm.get('email')?.value)
          localStorage.setItem('remember', this.loginForm.get('remember')?.value)
        } else {
          localStorage.removeItem('email')
          localStorage.removeItem('remember')
        }
        this.router.navigateByUrl('/dashboard');
      },
      error: err => {
        console.error('Observer got an error: ' + err)
        Swal.fire('Error', err.error.msg, 'error')
      },
    })
  }

  validField( field:string ):boolean{
    if(this.loginForm.get(field)?.invalid && this.formSubmitted){
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
