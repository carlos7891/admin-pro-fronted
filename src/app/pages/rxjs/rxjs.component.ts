import { Component, OnDestroy } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  intevalSub!:Subscription;


  constructor() {

    // this.retornaObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   valor => console.log('subs:', valor),
    //   (err) => console.log('error'),
    //   ()=> console.log('Obs terminado')
    // );

    this.intevalSub = this.retornaIntervalo()
      .subscribe(valor => console.log(valor))

  }
  ngOnDestroy(): void {
    this.intevalSub.unsubscribe();
  }

  retornaIntervalo():Observable<number>{
    return interval(500)
      .pipe(
        take(10),
        map(valor => valor + 1),
        filter(valor => (valor % 2 ===0 ) ? true: false),
      );
  }

  retornaObservable(){
    return new Observable<number>( observer => {
      let i = -1;

      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4){
          clearInterval(intervalo);
          observer.complete();
        }
        if( i ===2 ){
          observer.error('i llego al valor de 2')
        }
      }, 1000)
    });
  }



}
