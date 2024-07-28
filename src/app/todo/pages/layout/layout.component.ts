import { Component } from '@angular/core';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
	showFullMenu: boolean;

	constructor() {
		this.showFullMenu = false;
	}

	toggleMenu(): void {
		this.showFullMenu = !this.showFullMenu;
	}
}
