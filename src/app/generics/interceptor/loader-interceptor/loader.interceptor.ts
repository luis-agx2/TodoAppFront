import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { ADD_SPINNER } from '../../data/context-interceptor-spinner';
import { UtilsService } from '../../services/utils-service/utils.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
	private count = 0;

	constructor(private utilsSvc: UtilsService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const addSpinner = request.context.get(ADD_SPINNER);
		if (this.count === 0 && addSpinner) {
			this.utilsSvc.setSpinnerLoading(true);
		}

		if (addSpinner) {
			this.count++;
		}

		return next.handle(request).pipe(
			finalize(() => {
				if (addSpinner) {
					this.count--;
				}

				if (this.count === 0) {
					this.utilsSvc.setSpinnerLoading(false);
				}
			})
		);
	}
}
