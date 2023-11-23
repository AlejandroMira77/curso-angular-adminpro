import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: []
})
export class MedicoComponent implements OnInit {

  medicoForm!: FormGroup;
  hospitals: Hospital[] = [];
  selectedHospital: any;
  selectedMedico: any;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.medicoForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    });
    this.loadHospitals();
    this.medicoForm.get('hospital')?.valueChanges.subscribe(resp => {
      this.selectedHospital = this.hospitals.find(f => f._id === resp);
    });
    this.activatedRoute.params.subscribe(({ id }) => this.loadMedico(id));
  }

  saveMedico() {
    const { name } = this.medicoForm.value; 
    if (this.selectedMedico) {
      const data = {
        ...this.medicoForm.value,
        _id: this.selectedMedico._id
      }
      this.medicoService.updateMedico(data).subscribe(resp => {
        Swal.fire('Medico actualizado', name + ' actualizado correctamente', 'success');
      });
    } else {
      this.medicoService.createMedico(this.medicoForm.value).subscribe((resp: any) => {
        Swal.fire('Medico registrado', name + ' creado correctamente', 'success');
        this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`)
      });
    }
  }

  loadHospitals() {
    this.hospitalService.loadHospitals().subscribe(
      (hospitals: Hospital[]) => {
        this.hospitals = hospitals;
      })
  }

  loadMedico(id: string) {
    if (id === 'new') {
      return;
    }
    this.medicoService.getMedicoById(id).pipe(delay(100)).subscribe((resp: any) => {
      if (!resp) {
        return this.router.navigateByUrl(`/dashboard/medicos`);
      }
      this.selectedMedico = resp;
      this.medicoForm.setValue({name: resp.name, hospital: resp.hospital._id});
      return true;
    });
  }

}
