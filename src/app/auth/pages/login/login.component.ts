import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilsService } from '../../../generics/services/utils-service/utils.service';
import { AuthService } from '../../service/auth-service/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	formLogin: FormGroup;
	spinnerStatus: Observable<boolean>;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private authSvc: AuthService,
		private utilsSvc: UtilsService
	) {
		this.formLogin = this.fb.group({
			email: ['', [Validators.required]],
			password: ['', [Validators.required]]
		});

		this.spinnerStatus = this.utilsSvc.spinnerLoading();
	}

	sendSubmit(): void {
		if (this.formLogin.invalid) {
			this.formLogin.markAllAsTouched();
			return;
		}

		const { email, password } = this.formLogin.getRawValue();
		this.authSvc.login({ email, password }).subscribe({
			next: (resp) => {
				localStorage.setItem('token', resp.jwt);
				this.router.navigate(['/']);
			}
		});
	}

	redirectToRegister(): void {
		this.router.navigate(['/auth/register']);
	}
}
