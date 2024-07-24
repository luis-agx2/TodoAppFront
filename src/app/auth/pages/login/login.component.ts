import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	formLogin: FormGroup;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private authSvc: AuthService
	) {
		this.formLogin = this.fb.group({
			email: ['', [Validators.required]],
			password: ['', [Validators.required]]
		});
	}

	sendSubmit(): void {
		if (this.formLogin.invalid) {
			this.formLogin.markAllAsTouched();
			return;
		}

		const { email, password } = this.formLogin.getRawValue();
		this.authSvc.login({ email, password }).subscribe({
			next: (resp) => {
				localStorage.setItem('token', resp.token);
			}
		});
	}

	redirectToRegister(): void {
		this.router.navigate(['/auth/register']);
	}
}
