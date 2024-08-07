import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CustomGenericEvent } from '../../../../generics/interfaces/custom-events.interface';
import { TASK_STATUS } from '../../../data/task-status';
import { DashboardTask } from '../../../interfaces/dashboard-task.interface';
import { Task } from '../../../interfaces/task.interface';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
	@Input() dataGrid: DashboardTask;
	taskStatus = TASK_STATUS;

	@Output() dashBoardEvent = new EventEmitter<CustomGenericEvent>();

	constructor(private router: Router) {
		this.dataGrid = {
			cancelled: [],
			completed: [],
			inProgress: [],
			news: [],
			paused: []
		};
	}

	drop(dragAndDrop: CdkDragDrop<Task[]>): void {
		if (dragAndDrop.previousContainer === dragAndDrop.container) {
			moveItemInArray(dragAndDrop.container.data, dragAndDrop.previousIndex, dragAndDrop.currentIndex);
		} else {
			transferArrayItem(
				dragAndDrop.previousContainer.data,
				dragAndDrop.container.data,
				dragAndDrop.previousIndex,
				dragAndDrop.currentIndex
			);

			const valueEvent = {
				item: dragAndDrop.item.data,
				new_status: this.getStatusByColumnId(dragAndDrop.container.id)
			};

			this.emitEvent('drag_and_drop', valueEvent);
		}
	}

	clickItem(task: Task): void {
		const data = {
			item: task
		};

		this.emitEvent('clicked_item', data);
	}

	getStatusByColumnId(id: string): string {
		console.log(id);

		const a = {
			cancelled: () => this.taskStatus.find((item) => item.value === 'CANCELLED')?.value,
			completed: () => this.taskStatus.find((item) => item.value === 'COMPLETED')?.value,
			paused: () => this.taskStatus.find((item) => item.value === 'PAUSE')?.value,
			in_progress: () => this.taskStatus.find((item) => item.value === 'IN_PROGRESS')?.value,
			new: () => this.taskStatus.find((item) => item.value === 'NEW')?.value
		} as any;

		const fnGetName = a[id];

		if (!fnGetName) {
			return '';
		}

		return fnGetName();
	}

	emitEvent(action: string, value: any): void {
		this.dashBoardEvent.emit({ action, value });
	}

	redirectToAdd(): void {
		this.router.navigate(['/create-task']);
	}
}
