import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../auth/service/auth-service/auth.service';
import { MENU } from '../../data/menu';
import { MenuItem } from '../../interfaces/menu-item.interface';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnChanges, OnDestroy {
	@Input() show = false;
	@Input() loading = true;

	menuOptions: MenuItem[];
	themeControl!: FormControl;
	themeIcon!: 'light_mode' | 'dark_mode';
	userName: string;
	isMenuInBuildProgress: boolean;

	themeControlSubscription!: Subscription;

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private authSvc: AuthService
	) {
		this.startListeners();

		this.isMenuInBuildProgress = true;
		this.menuOptions = [];
		this.userName = '';
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes[`loading`] && changes[`loading`].currentValue === false) {
			this.menuOptions = this.buildUserMenu();
			this.userName = this.authSvc.username;
			this.setThemePreferences();
			this.isMenuInBuildProgress = false;
		}
	}

	ngOnDestroy(): void {
		this.themeControlSubscription.unsubscribe();
	}

	startListeners(): void {
		this.themeControl = new FormControl(false);
		this.themeControlSubscription = this.themeControl.valueChanges.subscribe({
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

	buildUserMenu(): MenuItem[] {
		let mergedOptionsMenu: any;

		this.authSvc.roles.map((role) => {
			const options = MENU?.[role.toLocaleUpperCase()] ?? [];

			const currentOptions = Object.fromEntries(options.map((option) => [option.id, option]));
			mergedOptionsMenu = { ...currentOptions, ...mergedOptionsMenu };
		});

		return Object.entries(mergedOptionsMenu).map((entry) => entry[1]) as MenuItem[];
	}

	setThemePreferences(): void {
		const preferences = JSON.parse(sessionStorage.getItem('user_preferences') ?? '{}');

		this.themeControl.setValue(preferences[`theme`] === 'DARK');
	}

	toggleTheme(): void {
		this.themeControl.setValue(!this.themeControl.value);
	}
}
