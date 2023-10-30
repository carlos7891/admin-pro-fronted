import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospitals.model';
import { User } from 'src/app/models/user.model';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-searchs',
  templateUrl: './searchs.component.html',
  styles: [
  ]
})
export class SearchsComponent implements OnInit {

  public users: User[]= [];
  public hospitals: Hospital[]= [];
  public doctors: Doctor[]= [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchesService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: ({term}) => {
          this.globalSearches(term);
      },
    })

    this.globalSearches('hello') 
  }

  globalSearches(term: string){
    this.searchService.globalSearch(term).subscribe({
      next: (resp: any) => {
        this.users = resp.users;
        this.doctors = resp.doctors;
        this.hospitals = resp.hospitals
      }
    })
  }

  redirect(type:string){
    console.log(type)
  }


}
