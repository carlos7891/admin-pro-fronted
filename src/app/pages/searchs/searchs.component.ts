import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searchs',
  templateUrl: './searchs.component.html',
  styles: [
  ]
})
export class SearchsComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next({term}) {
          console.log(term);
      },
    })
  }

}
