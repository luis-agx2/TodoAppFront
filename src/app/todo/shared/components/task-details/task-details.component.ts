import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UtilsService } from '../../../../generics/services/utils-service/utils.service';
import { Task } from '../../../interfaces/task.interface';

@Component({
	selector: 'app-task-details',
	templateUrl: './task-details.component.html',
	styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
	isMobile: boolean;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: Task,
		private dialog: MatDialogRef<TaskDetailsComponent>,
		private utilsSvc: UtilsService
	) {
		this.isMobile = this.utilsSvc.isMobile() ?? false;
	}

	ngOnInit(): void {
		console.log(this.data);
	}

	closeDialog(): void {
		this.dialog.close();
	}
}
