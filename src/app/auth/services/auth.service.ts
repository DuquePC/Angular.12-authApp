import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, computed, signal } from "@angular/core";
import { Observable, catchError, map, of, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ICheckTokenResponse, ILoginResponse, IUser } from "../interfaces";
import { AuthStatus } from "../interfaces/auth-status.enum";
import { __core_private_testing_placeholder__ } from "@angular/core/testing";


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;

  private _currentUser = signal< IUser | null>(null);
  private _authStatus = signal< AuthStatus >( AuthStatus.checking );

  //Exponemos el usuario de esta manera para que no se modifique en otra parte del programa.
  public currentUser = computed( () => this._currentUser);
  public authStatus = computed( () => this._authStatus);

  constructor(private http: HttpClient) { }


  private setAuthentication(user: IUser, token: string): boolean{

    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('token', token)
    
    return true;
  }

  login(email: string, password: string) : Observable<boolean>
  {
    const url = `${this.baseUrl}/auth`;
    const body = {email, password};

    return this.http.post<ILoginResponse>(url, body)
    .pipe(
      map(({ user, token }) => this.setAuthentication(user, token) ),

        catchError( err => {
          console.log(err)
          return throwError( () => err.error.message );
        }
        )
    )
    ;

    return of(true);
  }

  checkStatus(): Observable<boolean>{
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem( 'token' );

    if( !token) return of( false );

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);

    return this.http.get<ICheckTokenResponse>(url, { headers })  
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token) ),
        //Error
        catchError(() => {
          this._authStatus.set( AuthStatus.notAuthenticated );
          return of(false);
        })
      )
  }
}
