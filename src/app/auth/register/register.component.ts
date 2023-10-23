import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    name: [ 'Alejandro', [ Validators.required ]],
    email: [ 'test@gmail.com', [ Validators.required, Validators.email ]],
    password: [ '', [ Validators.required ]],
    password2: [ '', [ Validators.required ]],
    terms: [ false, [ Validators.required ]]
  }, {
    validators: this.samePasswords('password', 'password2')
  });

  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createUser() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.userService.createUser(this.registerForm.value).subscribe(resp => {
      this.router.navigateByUrl('/');
    }, (error) => {
      Swal.fire('Error', error.error.msg, 'error');
    });
  }

  invalidField(field: string): boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  acceptTerms() {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

  passwordsInvalid() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  samePasswords(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);
      if (pass1Control?.value === pass2Control?.value) {
           pass2Control?.setErrors(null);     
      } else {
        pass2Control?.setErrors({ noEsIgual: true })
      }
    }
  }
}
