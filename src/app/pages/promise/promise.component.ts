import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styles: [
  ]
})
export class PromiseComponent implements OnInit {
  prueba:boolean = false;
  
  constructor() { }

  ngOnInit(): void {
    // const promesa = new Promise((resolve, reject) => {
    //   if(this.prueba){
    //     resolve('hola mundo')
    //   }else{
    //     reject('reject')
    //   }

    // })

    // promesa.then((mensaje) => {
      
    //   console.log(mensaje)
    // }).catch(error => {
    //   console.log(error)
    // })

    this.getUsuarios().then(usuarios  => {
      console.log(usuarios)
    })

  }

  getUsuarios(){
    return new Promise( resolve => {
      fetch('https://reqres.in/api/users')
        .then( resp => resp.json() )
        .then( body => resolve(body.data) )
    });
   

  }




}
