import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private http: HttpClient
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  loadHospitals() {
    const url = `${ base_url }/hospitals`;
    return this.http.get<{hospitales: Hospital[]}>(url, this.headers)
    .pipe(
      map((resp: {hospitales: Hospital[]}) => resp.hospitales)
    )
  }

  createHospital(name: string) {
    const url = `${ base_url }/hospitals`;
    return this.http.post(url, { name }, this.headers);
  }

  updateHospital(_id: string, name: string) {
    const url = `${ base_url }/hospitals/${ _id }`;
    return this.http.put(url, { name }, this.headers);
  }

  deleteHospital(_id: string) {
    const url = `${ base_url }/hospitals/${ _id }`;
    return this.http.delete(url, this.headers);
  }
}
