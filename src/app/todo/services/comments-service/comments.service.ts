import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UtilsService } from '../../../generics/services/utils-service/utils.service';

@Injectable({
	providedIn: 'root'
})
export class CommentsService {
	private errorMessage = 'Something went wrong. Try again';
	private snackBarConfig = {
		panelClass: 'mat-snack-bar-error'
	};

	constructor(
		private http: HttpClient,
		private utilSvc: UtilsService
	) {}

	getComments(taskId: number): Observable<any> {
		const url = `${environment.comments.baseUrl}/${environment.comments.me}/${taskId}`;

		return this.http.get(url).pipe(
			catchError((error) => {
				this.utilSvc.openBasicSnackBar(this.errorMessage, this.snackBarConfig);
				throw error;
			})
		);
	}
}
