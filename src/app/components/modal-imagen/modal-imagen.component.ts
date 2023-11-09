import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: []
})
export class ModalImagenComponent implements OnInit {

  uploadImage!: File;
  imgTemp: any;

  constructor(
    public modalImagenService: ModalImagenService,
    private fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalImagenService.closeModal();
    this.imgTemp = null;
  }

  changeImage(event: any) {
    this.uploadImage = event.target.files[0];

    if (!this.uploadImage) { return this.imgTemp = null }
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadImage);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
    return
  }

  updatePhoto() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.type;
    this.fileUploadService.updatePhoto(this.uploadImage, tipo || 'usuarios', id || '')
      .then(img => {
        Swal.fire('Guardado', 'Imagen actualizada correctamente', 'success');
        this.modalImagenService.newImage.emit(img);
        this.closeModal();
      }).catch(() => {
        Swal.fire('Error', 'Error al cambiar la imagen', 'error');
      });
  }
}
