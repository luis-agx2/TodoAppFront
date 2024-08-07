import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UtilsService } from '../../../generics/services/utils-service/utils.service';

@Injectable({
	providedIn: 'root'
})
export class CategoriesService {
	private errorMessage = 'Something went wrong. Try again';
	private snackBarConfig = {
		panelClass: 'mat-snack-bar-error'
	};

	constructor(
		private http: HttpClient,
		private utilSvc: UtilsService
	) {}

	getAllCategories(): Observable<any> {
		const url = `${environment.categories.baseUrl}/${environment.categories.me}`;

		return this.http.get(url).pipe(
			catchError((error) => {
				this.utilSvc.openBasicSnackBar(this.errorMessage, this.snackBarConfig);
				throw error;
			})
		);
	}
}
