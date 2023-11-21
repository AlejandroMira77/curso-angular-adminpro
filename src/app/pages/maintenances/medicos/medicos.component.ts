import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: []
})
export class MedicosComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  medicos: Medico[] = [];
  medicosTemp: Medico[] = [];
  imgSubs!: Subscription;

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private search: SearchService,
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadMedicos();
    this.imgSubs = this.modalImagenService.newImage.pipe(delay(100)).subscribe(() => this.loadMedicos());
  }

  loadMedicos() {
    this.loading = true;
    this.medicoService.loadMedicos().subscribe(resp => {
      this.loading = false;
      this.medicos = resp;
    });
  }

  openModal(medico: Medico) {
    this.modalImagenService.showModal('medicos', medico._id, medico.img);
  }

  searchMedico(term: string) {
    if (term.length === 0) {
      return this.loadMedicos();
    }
    this.search.search('medicos', term).subscribe(resp => {
      this.medicos = resp;
    });
    return true;
  }

  deleteMedico(medico: Medico) {
    Swal.fire({
      title: '¿Borrar medico?',
      text: `Esta a punto de borrar a ${ medico.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.deleteMedico(medico._id || '').subscribe(resp => {
          Swal.fire(
            'Eliminado!',
            `El medico ha sido eliminado`,
            'success'
          );
          this.loadMedicos();
        });
      }
    });
  }

}
