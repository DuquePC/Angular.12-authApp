import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService) ;
  private router = inject( Router );

  public miFormulario: FormGroup = this.fb.group({
    email: ['ejmplo@veapues.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  }
  );

  constructor() { }

 

  login(){
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);
  
    const {email, password} = this.miFormulario.value;
  
    this.authService.login(email, password)
    .subscribe( 
      {
        next: () => this.router.navigateByUrl('/dashboard'),
        error: ( errorMessage ) =>{
          Swal.fire('Error', errorMessage, 'error');
        }
      }
    );
  }
}
