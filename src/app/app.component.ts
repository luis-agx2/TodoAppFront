import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
	title = 'TodoAppFront';
	resizeSubscription$: Subscription;

	constructor(@Inject(DOCUMENT) private document: Document) {
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
			this.document.body.classList.add('font-mobile');
		} else {
			this.document.body.classList.remove('font-mobile');
		}
	}
}
