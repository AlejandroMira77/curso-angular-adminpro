import Swal from 'sweetalert2';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn: ElementRef | undefined;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private ngZone: NgZone
  ) {
    this.loginForm = this.fb.group({
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe(resp => {
      if (this.loginForm.get('remember')?.value) {
        localStorage.setItem('email', this.loginForm.get('email')?.value);
      } else {
        localStorage.removeItem('email');
      }
      this.router.navigateByUrl('/');
    }, (error) => {
      Swal.fire('Error', error.error.msg, 'error');
    });
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: '920793375205-ibjfjsn9d5ls0i2pktq7d0t496h8j2i0.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn?.nativeElement,
      { theme: "outline", size: "large" }
    );
  }

  handleCredentialResponse(response: any) {
    this.userService.loginGoogle(response.credential).subscribe(
      (resp: any) => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/');
        });
      }
    );
  }
}
