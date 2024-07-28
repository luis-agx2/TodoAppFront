import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../../../auth/service/auth-service/auth.service';
import { UserPreferencesService } from '../../../services/user-preferences/user-preferences.service';
import { MENU } from '../../data/menu';
import { MenuItem } from '../../interfaces/menu-item.interface';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	@Input() show = false;

	menuOptions: MenuItem[];
	themeControl: FormControl;
	themeIcon: 'light_mode' | 'dark_mode';
	userName: string;

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private authSvc: AuthService,
		private userPreferencesSvc: UserPreferencesService
	) {
		this.menuOptions = this.buildUserMenu();
		this.userName = authSvc.username;
		this.themeIcon = 'light_mode';

		this.themeControl = new FormControl();

		this.themeControl.valueChanges.subscribe({
			next: (checked) => {
				if (checked) {
					this.themeIcon = 'light_mode';
					this.document.body.classList.add('dark-mode');
				} else {
					this.themeIcon = 'dark_mode';
					this.document.body.classList.remove('dark-mode');
				}
			}
		});
	}

	ngOnInit(): void {
		setTimeout(() => {
			this.getPreferences();
		}, 2000);
	}

	getPreferences(): void {
		this.userPreferencesSvc.getMyPreferences().subscribe({
			next: (preferences) => {
				this.themeControl.setValue(preferences[`theme`] === 'DARK');
			}
		});
	}

	buildUserMenu(): MenuItem[] {
		let mergedOptionsMenu: any;

		this.authSvc.roles.map((role) => {
			const options = MENU?.[role.toLocaleUpperCase()] ?? [];

			const currentOptions = Object.fromEntries(options.map((option) => [option.id, option]));
			mergedOptionsMenu = { ...currentOptions, ...mergedOptionsMenu };
		});

		return Object.entries(mergedOptionsMenu).map((entry) => entry[1]) as MenuItem[];
	}

	toggleTheme(): void {
		this.themeControl.setValue(!this.themeControl.value);
	}
}
