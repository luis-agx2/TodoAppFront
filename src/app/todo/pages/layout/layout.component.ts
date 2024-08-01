import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { UserPreferencesService } from '../../services/user-preferences/user-preferences.service';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
	showFullMenu: boolean;
	processInProgress = 0;

	constructor(private userPreferencesSvc: UserPreferencesService) {
		this.showFullMenu = false;
	}

	ngOnInit(): void {
		this.getPreferences();
	}

	getPreferences(): void {
		this.processInProgress++;

		this.userPreferencesSvc
			.getMyPreferences()
			.pipe(finalize(() => this.processInProgress--))
			.subscribe({
				next: (preferences) => {
					sessionStorage.setItem('user_preferences', JSON.stringify(preferences));
				}
			});
	}

	toggleMenu(): void {
		this.showFullMenu = !this.showFullMenu;
	}
}
