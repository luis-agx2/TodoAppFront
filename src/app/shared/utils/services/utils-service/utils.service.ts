import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root'
})
export class UtilsService {
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
}
