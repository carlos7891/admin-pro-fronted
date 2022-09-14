import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  title :string = '';
  titleSubs$!: Subscription;

  constructor(
    private router: Router
    ) {
      this.titleSubs$ = this.getdataRuta().
        subscribe( event => {
          this.title = event['title']
          document.title =`AdminPro - ${event['title']}`
        })
    }
  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

    getdataRuta(){
      return this.router.events.pipe(
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter((event:ActivationEnd) => event.snapshot.firstChild === null ),
        map((event:ActivationEnd) => event.snapshot.data)
      );
    }
}
