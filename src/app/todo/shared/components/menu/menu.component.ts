import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
	@Input() show = false;
	themeControl: FormControl;
	themeIcon: 'light_mode' | 'dark_mode';

	constructor(@Inject(DOCUMENT) private document: Document) {
		this.themeControl = new FormControl();
		this.themeIcon = 'dark_mode';

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
