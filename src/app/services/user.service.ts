import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { LoadUser } from '../interfaces/load-users.interface';
import { User } from '../models/user.model';

declare const google: any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userInfo!: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.userInfo.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  validateToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, this.headers).pipe(
      map((resp: any) => {
        const { email, google, name, role, uid, img } = resp.usuario;
        this.userInfo = new User(name, email, '', img, google, role, uid);
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    google.accounts.id.revoke('alejandro.mira77@gmail.com', () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  updatePerfilUser(data: {email: string, name: string, role?: string}) {
    data = {
      ...data,
      role: this.userInfo.role
    }
    return this.http.put(`${ base_url }/users/${ this.uid }`, data, this.headers)
  }

  loadUsers(from: number = 0) {
    const url = `${ base_url }/users/?from=${ from }`;
    return this.http.get<LoadUser>(url, this.headers).
    pipe(
      delay(200),
      map(resp => {
        const users = resp.users.map(
          user => new User(user.name, user.email, '', user.img, user.google, user.role, user.uid)
        )
        return {
          total: resp.total,
          users
        };
      })
    );
  }

  deleteUser(user: User) {
    const url = `${ base_url }/users/${ user.uid }`;
    return this.http.delete(url, this.headers);
  }
}
