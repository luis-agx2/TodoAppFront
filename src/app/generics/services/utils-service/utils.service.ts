import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UtilsService {
	private spinnerLoading$ = new ReplaySubject<boolean>(1);
	private isMobile$ = new BehaviorSubject<boolean | null>(null);

	constructor(private snackBar: MatSnackBar) {}

	openBasicSnackBar(message: string, snackBarConfig?: MatSnackBarConfig): void {
		const config = {
			duration: 3000,
			verticalPosition: 'top',
			horizontalPosition: 'end',
			...snackBarConfig
		} as MatSnackBarConfig;

		this.snackBar.open(message, '', config);
	}

	spinnerLoading(): Observable<boolean> {
		return this.spinnerLoading$.asObservable();
	}

	setSpinnerLoading(loading: boolean): void {
		this.spinnerLoading$.next(loading);
	}

	isMobile(): boolean | null {
		return this.isMobile$.value;
	}

	setIsMobile(isMobile: boolean): void {
		this.isMobile$.next(isMobile);
	}
}
