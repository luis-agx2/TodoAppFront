import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../../../auth/service/auth-service/auth.service';
import { MENU } from '../../data/menu';
import { MenuItem } from '../../interfaces/menu-item.interface';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
	@Input() show = false;

	menuOptions: MenuItem[];
	themeControl: FormControl;
	themeIcon: 'light_mode' | 'dark_mode';
	userName: string;

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private authSvc: AuthService
	) {
		let mergedOptionsMenu: any;

		this.menuOptions = [];
		this.themeControl = new FormControl();
		this.themeIcon = 'dark_mode';
		this.userName = authSvc.username;

		this.authSvc.roles.map((role) => {
			const options = MENU?.[role.toLocaleUpperCase()] ?? [];

			const currentOptions = Object.fromEntries(options.map((option) => [option.id, option]));
			mergedOptionsMenu = { ...currentOptions, ...mergedOptionsMenu };
		});

		this.menuOptions = Object.entries(mergedOptionsMenu).map((entry) => entry[1]) as MenuItem[];

		this.themeControl.valueChanges.subscribe({
			next: (checked) => {
				if (checked) {
					this.themeIcon = 'light_mode';
				} else {
					this.themeIcon = 'dark_mode';
				}
				this.document.body.classList.toggle('dark-mode');
			}
		});
	}

	toggleTheme(): void {
		this.themeControl.setValue(!this.themeControl.value);
	}
}
