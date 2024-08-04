import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
	new = [0];
	todo = [1, 2, 3];
	done = [4, 5, 6];
	cuatro = [7];
	cinco = [8];
	seis = [9];

	constructor() {}

	drop(event: CdkDragDrop<number[]>): void {
		console.log(event.previousContainer === event.container);

		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
		}
	}
}
