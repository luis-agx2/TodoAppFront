import { Directive, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ErrorMessage } from '../../interfaces/error-message.interface';
import { ErrorMessagesService } from '../../services/error-messages-service/error-messages.service';

@Directive({
	selector: '[appReactiveControlError]'
})
export class ReactiveControlErrorDirective {
	private control?: AbstractControl;
	private name?: string;
	private messages?: ErrorMessage;
	private valueChangesSubscription?: Subscription;
	a: any;

	@Input() set fieldName(name: string) {
		this.name = name;
	}

	@Input() set customErrorMessages(errorMessages: ErrorMessage | null) {
		this.messages = errorMessages ?? undefined;
	}

	@Input() set appReactiveControlError(control: AbstractControl | null) {
		this.control = control ?? undefined;

		this.valueChangesSubscription?.unsubscribe();
		this.valueChangesSubscription = this.control?.valueChanges.subscribe({
			next: () => {
				this.updateView();
			}
		});
	}

	constructor(
		private el: ElementRef,
		private viewContainer: ViewContainerRef,
		private errorMessagesSvc: ErrorMessagesService
	) {}

	private updateView(): void {
		this.viewContainer.clear();

		// this.control?.setErrors({ noIguales: true });

		if (!!this.control?.errors) {
			this.el.nativeElement.textContent = this.getErrorMessage();
			return;
		}
	}

	getErrorMessage(): string {
		return this.errorMessagesSvc.getErrorMessage(this.control, this.name, this.messages);
	}
}
