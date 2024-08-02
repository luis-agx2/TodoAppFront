import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { UtilsService } from './generics/services/utils-service/utils.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
	title = 'TodoAppFront';
	resizeSubscription$: Subscription;

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private utilSvc: UtilsService
	) {
		this.verifyResize(window.innerWidth);

		this.resizeSubscription$ = fromEvent(window, 'resize').subscribe({
			next: ({ target }) => {
				this.verifyResize((target as Window)?.innerWidth);
			}
		});
	}

	ngOnDestroy(): void {
		this.resizeSubscription$.unsubscribe();
	}

	verifyResize(size: number): void {
		if (size <= 768) {
			this.utilSvc.setIsMobile(true);
			this.document.body.classList.add('font-mobile');
		} else {
			this.utilSvc.setIsMobile(false);
			this.document.body.classList.remove('font-mobile');
		}
	}
}
