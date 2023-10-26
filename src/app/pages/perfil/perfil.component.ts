import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: []
})
export class PerfilComponent implements OnInit {

  perfilForm!: FormGroup;
  user!: User;
  uploadImage!: File;
  imgTemp: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) {
    this.user = userService.userInfo;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }

  updatePerfil() {
    this.userService.updatePerfilUser(this.perfilForm.value).subscribe(
      resp => {
        const { name, email } = this.perfilForm.value;
        Swal.fire(name, 'Actualizado correctamente', 'success');
        this.user.name = name;
        this.user.email = email;
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
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
    this.fileUploadService.updatePhoto(this.uploadImage, 'usuarios', this.user.uid || '')
      .then(img => {
        this.user.img = img;
        Swal.fire('Guardado', 'Imagen actualizada correctamente', 'success');
      }).catch(() => {
        Swal.fire('Error', 'Error al cambiar la imagen', 'error');
      });
  }

}
