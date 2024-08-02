import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectChange } from '@angular/material/select';
import { CustomGenericEvent } from '../../interfaces/custom-events.interface';
import { GenericViewSelectOption } from '../../interfaces/generic-view-select-options.interface';

@Component({
	selector: 'app-generic-view-select',
	templateUrl: './generic-view-select.component.html',
	styleUrls: ['./generic-view-select.component.scss']
})
export class GenericViewSelectComponent implements OnChanges {
	@ViewChild('genericViewFormField') matFormField!: MatFormField;

	@Input() appearance: 'outline' | 'fill';
	@Input() title: string;
	@Input() fieldClass?: string;
	@Input() panelClass?: string;
	@Input() options: GenericViewSelectOption[];
	@Input() selectedView: string;

	panelClasses: string[];

	@Output() event = new EventEmitter<CustomGenericEvent>();

	constructor() {
		this.title = '';
		this.panelClasses = ['generic-view-select-panel'];
		this.options = [];
		this.appearance = 'outline';
		this.selectedView = 'list_view';
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (!!changes[`panelClass`]) {
			this.panelClasses.push(changes[`panelClass`].currentValue);
		}
	}

	optionChange(event: MatSelectChange): void {
		this.emitEvent('change_option_view', event.value);
	}

	emitEvent(action: string, value: any): void {
		this.event.emit({ action, value });
	}
}
