import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalsService } from '../../../services/hospitals.service';
import { Hospital } from 'src/app/models/hospitals.model';
import { DoctorsService } from 'src/app/services/doctors.service';
import Swal from 'sweetalert2';
import { Doctor } from 'src/app/models/doctor.model';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {

  public doctorForm!: FormGroup;
  public hospitals: Hospital [] = [];
  public hospital!: Hospital | undefined;
  public doctorSelected !: Doctor;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalsService,
    private doctorService: DoctorsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllHospitals();
    this.initialForm();
    this.onChange();
    this.getParams();
  }

  initialForm(){
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    })
  }

  saveDoctor(){
    if(this.doctorForm.valid){
      if (this.doctorSelected){
        this.doctorService.updateDoctor(this.doctorSelected._id, this.doctorForm.value)
        .subscribe({
          next:() =>{
            Swal.fire('Updated', 'Doctor Updated', 'success');
            this.router.navigateByUrl('/dashboard/doctors');
          }
        })
      } else {
        this.doctorService.createDoctor(this.doctorForm.value)
          .subscribe({
            next:() =>{
              Swal.fire('Created', 'Doctor Created', 'success');
              this.router.navigateByUrl('/dashboard/doctors');
            }
          })
      }
    }
  }

  getAllHospitals(){
    this.hospitalService.getHospitals('NaN').subscribe({
      next:({hospitals}) =>{
        this.hospitals = hospitals;
      }
    })
  }

  onChange(){
    this.doctorForm.get('hospital')?.valueChanges
      .subscribe({
        next:( hospitalId ) => {
          this.hospital = this.hospitals.find(x => x._id == hospitalId);
        }
      })
  }

  getParams(){
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(id === 'new'){
        return
      }
      this.getDoctorById(id);
    })
  }

  getDoctorById(id: string){
    this.doctorService.getDoctorById(id)
      .pipe(
        delay(100)
      )
      .subscribe({
        next:(resp:any) =>{
          this.doctorSelected = resp.doctor;
          this.doctorForm.controls['name'].setValue(this.doctorSelected.name);
          this.doctorForm.controls['hospital'].setValue(this.doctorSelected.hospital);
        },
        error:(error) =>{
          console.log(error);
          Swal.fire('Not found', error.error.msg, 'error');
          this.router.navigateByUrl('/dashboard/doctors');
        },
    })
  }
}
