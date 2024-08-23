import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomGenericEvent } from '../../../../generics/interfaces/custom-events.interface';
import { Task } from '../../../interfaces/task.interface';

@Component({
	selector: 'app-dashboard-item',
	templateUrl: './dashboard-item.component.html',
	styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent {
	@Input() task: Task | null;
	@Output() dashBoardItemEvent = new EventEmitter<CustomGenericEvent>();

	constructor() {
		this.task = null;
	}

	clickItem(): void {
		const data = {
			item: this.task
		};

		this.emitEvent('clicked_item', data);
	}

	optionMenuSelected(optionName: string): void {
		const data = {
			item: this.task
		};

		this.emitEvent(optionName, data);
	}

	emitEvent(action: string, value: any): void {
		this.dashBoardItemEvent.emit({ action, value });
	}
}
