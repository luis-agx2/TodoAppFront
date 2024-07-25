import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { regex } from '../../data/regex';

@Injectable({
	providedIn: 'root'
})
export class CustomValidatorsService {
	constructor() {}

	email(control: AbstractControl): ValidationErrors | null {
		return !regex.emailPattern.test(control.value) ? { invalid_email: true } : null;
	}

	atLeastLetterUpper(control: AbstractControl): ValidationErrors | null {
		return !regex.upperCase.exec(control.value) ? { no_uppercase_letter: true } : null;
	}

	atLeastLetterLower(control: AbstractControl): ValidationErrors | null {
		return !regex.lowerCase.exec(control.value) ? { no_lowercase_letter: true } : null;
	}

	atLeastNumber(control: AbstractControl): ValidationErrors | null {
		return !regex.decimal.exec(control.value) ? { no_number: true } : null;
	}

	atLeastSymbol(control: AbstractControl): ValidationErrors | null {
		return !regex.symbol.exec(control.value) ? { no_symbol: true } : null;
	}
}
