import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { noAddToken } from '../../../shared/data/context-niterceptor-token';
import { UtilsService } from '../../../shared/services/utils-service/utils.service';
import { Login } from '../../interfaces/login.interface';
import { Register } from '../../interfaces/register.interface';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private jwtHelper = new JwtHelperService();

	private errorMessage = 'Something went wrong. Try again';
	private snackBarConfig = {
		panelClass: 'mat-snack-bar-error'
	};

	constructor(
		private http: HttpClient,
		private utilSvc: UtilsService
	) {}

	login(login: Login): Observable<any> {
		const url = `${environment.auth.baseUrl}`;
		return this.http.post(url, login, { context: noAddToken() }).pipe(
			catchError((error) => {
				this.utilSvc.openBasicSnackBar(this.errorMessage, this.snackBarConfig);
				throw error;
			})
		);
	}

	register(data: Register): Observable<any> {
		const url = `${environment.auth.baseUrl}/${environment.auth.register}`;
		return this.http.post(url, data, { context: noAddToken() }).pipe(
			catchError((error) => {
				this.utilSvc.openBasicSnackBar(this.errorMessage, this.snackBarConfig);
				throw error;
			})
		);
	}

	logout(): void {
		localStorage.removeItem('token');
	}
	get token(): string | null {
		return localStorage.getItem('token');
	}

	isAuthenticated(): boolean {
		return !!this.token && !this.jwtHelper.isTokenExpired(this.token);
	}

	get roles(): string[] {
		if (!this.token) {
			return [];
		}

		const decodedToken = this.jwtHelper.decodeToken(this.token);
		return decodedToken?.authorities?.map((authority: any) => authority.authority);
	}

	get username(): string {
		if (!this.token) {
			return 'Username';
		}

		const decodedToken = this.jwtHelper.decodeToken(this.token);
		return decodedToken?.name ?? 'Username';
	}

	hasAnyRole(allowedRoles: string[]): boolean {
		return allowedRoles.some((allowRole) => {
			return this.roles.some((role) => allowRole.toLocaleUpperCase() === role.toLocaleUpperCase());
		});
	}
}
