import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorMessage } from '../../../shared/interfaces/error-message.interface';
import { CustomValidatorsService } from '../../../shared/services/custom-validators/custom-validators.service';
import { AuthService } from '../../service/auth-service/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
	customErrorMessagesForControls: ErrorMessage;

	formRegister = this.fb.group({
		username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
		email: ['', [Validators.required, this.customValidators.email]],
		password: [
			'',
			[
				Validators.required,
				Validators.minLength(8),
				this.customValidators.atLeastLetterLower,
				this.customValidators.atLeastLetterUpper,
				this.customValidators.atLeastSymbol,
				this.customValidators.atLeastSymbol,
				this.customValidators.atLeastNumber
			]
		],
		confirm_password: ['', [Validators.required]]
	});

	constructor(
		private fb: FormBuilder,
		private customValidators: CustomValidatorsService,
		private authSvc: AuthService
	) {
		this.customErrorMessagesForControls = {
			invalid_email: (fieldName: string): string => `The ${fieldName} is invalid`,
			no_lowercase_letter: (fieldName: string): string =>
				`The ${fieldName} must contain at least one lower case letter`,
			no_symbol: (fieldName: string): string => `The ${fieldName} must contain at least one symbol`,
			no_uppercase_letter: (fieldName: string): string => `The ${fieldName} must contain at least one uppercase letter`,
			no_number: (fieldName: string): string => `The ${fieldName} is must contain at least one number`,
			no_match: (fieldName: string) => `The password not match`
		};
	}

	sendSubmit(): void {
		if (this.formRegister.invalid) {
			this.formRegister.markAllAsTouched();
			return;
		}

		const { username, email, password } = this.formRegister.getRawValue();

		this.authSvc.register({ username: username!, email: email!, password: password!, roleId: 1 }).subscribe({
			next: () => {}
		});
	}
}
