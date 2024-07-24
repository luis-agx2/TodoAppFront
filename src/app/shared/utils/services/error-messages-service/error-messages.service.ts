import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { errors } from '../../data/error-messages';

@Injectable({
	providedIn: 'root'
})
export class ErrorMessagesService {
	constructor() {}

	getErrorMessage(control: AbstractControl, name: string): string {
		const errorsKey = Object.keys(control?.errors ?? {});

		const error = this.getFirst(errorsKey);
		let errorFn = null;
		if (error && !!name) {
			errorFn = errors[error];
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
