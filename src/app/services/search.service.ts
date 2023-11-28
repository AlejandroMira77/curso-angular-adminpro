import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

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

  private transformUsers(result: any[]): User[] {
    return result.map(
      user => new User(user.name, user.email, '', user.img, user.google, user.role, user.uid)
    );
  }

  search(type: 'usuarios' | 'medicos' | 'hospitales', term: string) {
    const url = `${base_url}/all/collection/${type}/${term}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {
          switch (type) {
            case 'usuarios':
              return this.transformUsers(resp.resultados);
            case 'hospitales':
              return resp.resultados;
            case 'medicos':
              return resp.resultados;
            default:
              return [];
          }
        })
      );
  }

  globalSearch(term: string) {
    const url = `${base_url}/all/${term}`;
    return this.http.get<any[]>(url, this.headers);
  }
}
