import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UtilsService } from '../../../shared/services/utils-service/utils.service';
import { Login } from '../../interfaces/login.interface';
import { Register } from '../../interfaces/register.interface';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	errorMessage = 'Something went wrong. Try again';
	snackBarConfig = {
		panelClass: 'mat-snack-bar-error'
	};

	constructor(
		private http: HttpClient,
		private utilSvc: UtilsService
	) {}

	login(login: Login): Observable<any> {
		const url = `${environment.auth.baseUrl}/${environment.auth.login}`;
		return this.http.post(url, login).pipe(
			catchError((error) => {
				this.utilSvc.openBasicSnackBar(this.errorMessage, this.snackBarConfig);
				throw error;
			})
		);
	}

	register(data: Register): Observable<any> {
		const url = `${environment.auth.baseUrl}/${environment.auth.register}`;
		return this.http.post(url, data).pipe(
			catchError((error) => {
				this.utilSvc.openBasicSnackBar(this.errorMessage, this.snackBarConfig);
				throw error;
			})
		);
	}
}
