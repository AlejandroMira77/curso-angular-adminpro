import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalsService } from 'src/app/services/hospitals.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: []
})
export class HospitalsComponent implements OnInit {

  hospitales: Hospital[] = [];
  hospitalesTemp: Hospital[] = [];
  loading: boolean = true;
  imgSubs!: Subscription;

  constructor(
    private hospitalsService: HospitalsService,
    private modalImagenService: ModalImagenService,
    private search: SearchService,
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadHospitals();
    this.imgSubs = this.modalImagenService.newImage.subscribe(() => this.loadHospitals());
  }

  loadHospitals() {
    this.loading = true;
    this.hospitalsService.loadHospitals().subscribe(
      hospitales => {
        this.loading = false;
        this.hospitales = hospitales;
        this.hospitalesTemp = hospitales;
      }
    );
  }

  updateHospital(hospital: Hospital) {
    this.hospitalsService.updateHospital(hospital._id || '', hospital.name)
    .subscribe(resp => {
      Swal.fire('Actualizado', hospital.name, 'success');
    });
  }
  
  deleteHospital(hospital: Hospital) {
    this.hospitalsService.deleteHospital(hospital._id || '')
    .subscribe(resp => {
      this.loadHospitals();
      Swal.fire('Eliminado', hospital.name, 'error');
    });
  }

  async openSweetAlert() {
    const { value } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo Hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    });

    if (value?.trim().length || 0 > 0) {
      console.log(value);
      this.hospitalsService.createHospital(value || '')
      .subscribe((resp: any) => {
        this.hospitales.push(resp.hospitalDB);
      });
    }
  }

  openModal(hospital: Hospital) {
    this.modalImagenService.showModal('hospitales', hospital._id, hospital.img);
  }

  searchHospital(term: string) {
    if (term.length === 0) {
      return this.hospitales = this.hospitalesTemp;
    }
    this.search.search('hospitales', term).subscribe(resp => {
      this.hospitales = resp;
    });
    return true;
  }

}
