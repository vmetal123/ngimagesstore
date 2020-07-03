import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from '../accounts-module/models/user.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getUsers() {
    const usersEndpoint = `${environment.apiURL}api/v1/Account`;

    return this.http.get<User[]>(usersEndpoint).pipe(
      map((res: any) => res.users),
      catchError(this.handleError)
    );
  }

  createUser(user: User) {
    console.log(user);
    const registerEndpoint = `${environment.apiURL}api/v1/Account`;

    return this.http
      .post<User>(registerEndpoint, user)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(error.error);
    }
    if (error.status === 400 && error.error.hasOwnProperty('errors') && Array.isArray(error.error.errors)) {
      return throwError(error.error.errors.join(' '));
    }

    return throwError('An error ocurred');
  }
}
