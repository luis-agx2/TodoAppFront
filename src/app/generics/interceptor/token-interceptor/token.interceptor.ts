import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADD_TOKEN } from '../../data/context-niterceptor-token';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor() {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (request.context.get(ADD_TOKEN)) {
			request = this.addHeaders(request);
		}

		return next.handle(request);
	}

	addHeaders(request: HttpRequest<any>): HttpRequest<unknown> {
		let token: string | null;
		token = localStorage.getItem('token');

		if (token) {
			return request.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`
				}
			});
		}

		return request;
	}
}
