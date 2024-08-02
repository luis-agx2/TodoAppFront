import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UtilsService } from '../../../../generics/services/utils-service/utils.service';
import { TASK_STATUS } from '../../../data/task-status';
import { Comment } from '../../../interfaces/comment.interface';
import { Task } from '../../../interfaces/task.interface';
import { CommentsService } from '../../../services/comments-service/comments.service';

@Component({
	selector: 'app-task-details',
	templateUrl: './task-details.component.html',
	styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent {
	isMobile: boolean;
	statusName: string;
	taskComments: Comment[];
	taskStatus = TASK_STATUS;
	loadingStatus: Observable<boolean>;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: Task,
		private dialog: MatDialogRef<TaskDetailsComponent>,
		private utilsSvc: UtilsService,
		private commentsSvc: CommentsService
	) {
		this.loadingStatus = utilsSvc.spinnerLoading();
		this.taskComments = [];
		this.isMobile = this.utilsSvc.isMobile() ?? false;
		this.statusName = this.taskStatus.find((status) => status.value === data.status)?.name ?? 'S/I';

		this.getComments();
	}

	getComments(): void {
		this.commentsSvc.getComments(this.data.id).subscribe({
			next: (resp) => {
				this.taskComments = resp;
			}
		});
	}

	closeDialog(): void {
		this.dialog.close();
	}
}
