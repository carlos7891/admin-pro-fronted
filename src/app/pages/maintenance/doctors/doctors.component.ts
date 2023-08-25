import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorsService } from 'src/app/services/doctors.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit, OnDestroy {

  public totalDoctors: number = 0;
  public doctors: Doctor[] =[];
  public doctorsTemp: Doctor[] =[];
  public from: number = 0;
  public loading: boolean = true;
  public imgSubs!: Subscription;

  constructor(
    private doctorService: DoctorsService,
    private modalImageService: ModalImageService,
    private serchService : SearchesService
  ) { }

  ngOnInit(): void {
    this.getAllDoctors();
    this.imgSubs = this.modalImageService.newImage
    .pipe(
      delay(100)
    )
    .subscribe({
      next:() =>this.getAllDoctors()
    })
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  getAllDoctors(){
    this.loading = true;
    this.doctorService.getDoctors(this.from).subscribe({
      next:({total, doctors}) =>{
        this.totalDoctors = total;
        this.doctors = doctors;
        this.doctorsTemp = doctors;
        this.loading = false;
      }
    })
  }

  changePage( value: number){
    this.from += value;
    if(this.from < 0){
      this.from = 0;
    }else if( this.from > this.totalDoctors){
      this.from -= value;
    }
    this.getAllDoctors();
  }

  createDoctor(){
    console.log('create');
  }

  search(term: string ){
    if(term.length === 0){
      this.doctors = this.doctorsTemp;
    }else{
      this.serchService.search('doctors', term)
        .subscribe({
          next:(resp)=>{
            this.doctors = resp;
          }
        })
    }
  }

  openModal(doctor: Doctor){
    this.modalImageService.openModal("doctors", doctor._id, doctor.img);
  }

  changeName( doctor: Doctor){
    console.log(doctor);
  }

  deleteDoctor(doctor: Doctor){
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
        this.doctorService.deleteDoctorr(doctor)
          .subscribe({
            next:() => {
              this.getAllDoctors()
              Swal.fire(
                'Deleted!',
                `${doctor.name} has been deleted.`,
                'success'
              )
            }
          })
      }
    })
  }

}
