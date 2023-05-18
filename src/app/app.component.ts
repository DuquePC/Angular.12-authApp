import { Component, computed, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'authApp';

  private authService = inject( AuthService );

  public finishedAuthCheck = computed<boolean>(() => {
      if( this.authService.authStatus === AuthStatus.authenticated ){
        return false;
      }

      return true;
    }
  )
}
