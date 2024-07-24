import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UtilsService } from '../../../shared/utils/services/utils-service/utils.service';
import { Login } from '../../interfaces/login.interface';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	errorMessage = 'Something went wrong. Try again';

	constructor(
		private http: HttpClient,
		private utilSvc: UtilsService
	) {}

	login(login: Login): Observable<any> {
		const url = `${environment.auth.baseUrl}/${environment.auth.login}`;
		return this.http.post(url, login).pipe(
			catchError((error) => {
				this.utilSvc.openBasicSnackBar(this.errorMessage, { panelClass: 'mat-snack-bar-error' });
				throw error;
			})
		);
	}
}
