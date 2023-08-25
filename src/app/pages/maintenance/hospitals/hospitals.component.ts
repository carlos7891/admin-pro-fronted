import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospitals.model';
import { HospitalsService } from 'src/app/services/hospitals.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit, OnDestroy {

  public totalHospitals: number = 0;
  public hospitals: Hospital[] =[];
  public hospitalsTemp: Hospital[] =[];
  public from: number = 0;
  public loading: boolean = true;
  public imgSubs!: Subscription;

  constructor(
    private hospitalService: HospitalsService,
    private modalImageService: ModalImageService,
    private serchService : SearchesService
  ) { }

  ngOnInit(): void {
    this.getAllHospitals();
    this.imgSubs = this.modalImageService.newImage
    .pipe(
      delay(100)
    )
    .subscribe({
      next:() =>this.getAllHospitals()
    })
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
}

  getAllHospitals(){
    this.loading = true;
    this.hospitalService.getHospitals(this.from).subscribe({
      next:({total, hospitals}) =>{
        this.totalHospitals = total;
        this.hospitals = hospitals;
        this.hospitalsTemp = hospitals;
        this.loading = false;
      }
    })
  }

  changePage( value: number){
    this.from += value;
    if(this.from < 0){
      this.from = 0;
    }else if( this.from > this.totalHospitals){
      this.from -= value;
    }
    this.getAllHospitals();
  }

  changeName( hospital:Hospital ){
    this.hospitalService.updateHospital(hospital._id, hospital.name)
      .subscribe({
        next(resp) {
            Swal.fire('Updated', hospital.name, 'success')
        },
      })
  }

  deleteHospital( hospital:Hospital ){
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
        this.hospitalService.deleteHospital(hospital._id)
          .subscribe({
            next:() => {
              this.getAllHospitals()
              Swal.fire(
                'Deleted!',
                `${hospital.name} has been deleted.`,
                'success'
              )
            }
          })
      }
    })
  }

  async createHospital(){
    const { value } = await Swal.fire<string>({
      input: 'text',
      title: 'Create hospital',
      inputLabel: 'Write name of the new hospital',
      inputPlaceholder: 'Enter the name',
      showCancelButton: true,
    })

    if (value?.trim().length! > 0) {
      this.hospitalService.createHospital( value! )
        .subscribe({
          next:(resp:any) => {
            this.hospitals.push(resp.hospital)
            Swal.fire(
              'Created!',
              `${value} has been created.`,
              'success'
            )
          }
        })
    }
  }

  openModal(hospital: Hospital){
    this.modalImageService.openModal("hospitals", hospital._id, hospital.img);
  }

  search(term: string ){
    if(term.length === 0){
      this.hospitals = this.hospitalsTemp;
    }else{
      this.serchService.search('hospitals', term)
        .subscribe({
          next:(resp)=>{
            this.hospitals = resp;
          }
        })
    }
  }

}
