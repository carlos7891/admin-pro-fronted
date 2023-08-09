import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {

  public imagePreview!:string | null;
  public file!: File;

  constructor(
    public modalImageService: ModalImageService,
    private fileService: FileUploadService
  ) { }

  closeModal(){
    this.imagePreview = null;
    this.modalImageService.closeModal();
  }

  changeImage(files:any){
    if (!files.files[0]){
      this.imagePreview  = null;
      return
    }
    this.file = files.files[0];
    const reader = new FileReader();
    reader.onload = () => (this.imagePreview = reader.result as string);
    reader.readAsDataURL(this.file);
  }

  uploadImage(){
    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fileService.updateImage(this.file, type, id).subscribe({
      next: (resp:any) =>{
        this.logingMessage(resp.msg);
        this.modalImageService.newImage.emit(resp.file);
        this.closeModal();
      },
      error: err => {
        console.error('Observer got an error: ' + err)
        Swal.fire('Error', err.error.msg, 'error')
      },
    })
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
