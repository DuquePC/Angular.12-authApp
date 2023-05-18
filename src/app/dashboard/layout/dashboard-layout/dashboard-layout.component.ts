import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {

  private authService = inject( AuthService ); 

  private user = computed( ()=> this.authService.currentUser());
  //Se pueden usar estas dos formas para accerder al currentUser
  // get user(){
  //   return this.authService.currentUser();
  // }

  constructor() { }

  

}
