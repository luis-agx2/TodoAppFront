import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessage } from '../../../shared/interfaces/error-message.interface';
import { CustomValidatorsService } from '../../../shared/services/custom-validators/custom-validators.service';
import { UtilsService } from '../../../shared/services/utils-service/utils.service';
import { AuthService } from '../../service/auth-service/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
	customErrorMessagesForControls: ErrorMessage;

	formRegister = this.fb.group(
		{
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
			confirm_password: [{ value: '', disabled: true }]
		},
		{
			// fix validators: [this.customValidators.matchControls('password', 'confirm_password')]
		}
	);

	constructor(
		private fb: FormBuilder,
		private customValidators: CustomValidatorsService,
		private authSvc: AuthService,
		private utilSvc: UtilsService,
		private router: Router,
		private location: Location
	) {
		this.customErrorMessagesForControls = this.buildCustomErrorMessages();
	}

	sendSubmit(): void {
		if (this.formRegister.invalid) {
			this.formRegister.markAllAsTouched();
			return;
		}

		const { username, email, password } = this.formRegister.getRawValue();

		this.authSvc.register({ username: username!, email: email!, password: password!, roleId: 1 }).subscribe({
			next: () => {
				this.utilSvc.openBasicSnackBar('The user has been registered successfully', {
					panelClass: 'mat-snack-bar-success'
				});

				this.router.navigate(['auth/']);
			}
		});
	}

	goBack(): void {
		this.location.back();
	}

	buildCustomErrorMessages(): ErrorMessage {
		return {
			invalid_email: (fieldName: string): string => `The ${fieldName} is invalid`,
			no_lowercase_letter: (fieldName: string): string =>
				`The ${fieldName} must contain at least one lower case letter`,
			no_symbol: (fieldName: string): string => `The ${fieldName} must contain at least one symbol`,
			no_uppercase_letter: (fieldName: string): string => `The ${fieldName} must contain at least one uppercase letter`,
			no_number: (fieldName: string): string => `The ${fieldName} is must contain at least one number`
		};
	}
}
