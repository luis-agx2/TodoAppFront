import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UtilsService } from '../../../generics/services/utils-service/utils.service';

@Injectable({
	providedIn: 'root'
})
export class TasksService {
	private errorMessage = 'Something went wrong. Try again';
	private snackBarConfig = {
		panelClass: 'mat-snack-bar-error'
	};

	constructor(
		private http: HttpClient,
		private utilSvc: UtilsService
	) {}

	getAllMe(page = 0, size = 1): Observable<any> {
		const params = new HttpParams().append('page', page).append('size', size);

		const url = `${environment.tasks.baseUrl}/${environment.tasks.me}`;

		return this.http.get(url, { params }).pipe(
			catchError((error) => {
				this.utilSvc.openBasicSnackBar(this.errorMessage, this.snackBarConfig);
				throw error;
			})
		);
	}
}
