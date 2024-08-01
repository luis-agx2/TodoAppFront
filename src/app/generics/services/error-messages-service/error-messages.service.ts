import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { errors } from '../../data/error-messages';
import { ErrorMessage } from '../../interfaces/error-message.interface';

@Injectable({
	providedIn: 'root'
})
export class ErrorMessagesService {
	constructor() {}

	getErrorMessage(control?: AbstractControl, name?: string, errorMessages?: ErrorMessage): string {
		const errorKeys = Object.keys(control?.errors ?? {});

		const error = this.getFirst(errorKeys);

		let errorFn = null;
		if (!!error && !!name) {
			errorFn = errors[error] ?? errorMessages?.[error];
		}

		if (!!errorFn) {
			return errorFn(name!);
		}

		return 'Invalid field';
	}

	private getFirst(array: any[]): string | null {
		if (array.length >= 0) {
			return array[0];
		}

		return null;
	}
}
