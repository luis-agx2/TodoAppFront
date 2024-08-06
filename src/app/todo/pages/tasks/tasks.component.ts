import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CustomGenericEvent } from '../../../generics/interfaces/custom-events.interface';
import { GenericTableColumn, GenericTablePaginator } from '../../../generics/interfaces/generic-table.interface';
import { GenericViewSelectOption } from '../../../generics/interfaces/generic-view-select-options.interface';
import { TableWithPagination } from '../../../generics/interfaces/table-with-pagination.interface';
import { UtilsService } from '../../../generics/services/utils-service/utils.service';
import { TASK_STATUS } from '../../data/task-status';
import { Task, UpdateTask } from '../../interfaces/task.interface';
import { TasksService } from '../../services/tasks-service/tasks.service';
import { TaskDetailsComponent } from '../../shared/components/task-details/task-details.component';

@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
	isMobile: boolean;
	selectedView: string;
	optionsGenericSelectView: GenericViewSelectOption[];
	dataTable: Task[];
	dataGrid: any;
	columnsTable: GenericTableColumn[];
	paginatorTable: GenericTablePaginator;

	private snackBarConfig = {
		panelClass: 'mat-snack-bar-success'
	};
	spinnerStatus: Observable<boolean>;

	constructor(
		private utilsSvc: UtilsService,
		private tasksSvc: TasksService,
		private dialog: MatDialog
	) {
		this.isMobile = utilsSvc.isMobile() ?? false;
		this.spinnerStatus = this.utilsSvc.spinnerLoading();
		this.selectedView = this.setSelectedView();
		this.optionsGenericSelectView = this.buildViewMenu();
		this.columnsTable = this.buildColumnsTable();
		this.dataTable = [];
		this.paginatorTable = { length: 0, pageIndex: 0, previousPageIndex: 0, pageSize: 10 };

		this.getMeTasks();
	}

	onSelectedViewChange(event: CustomGenericEvent): void {
		this.selectedView = event.value;
		this.getMeTasks();
	}

	eventTableHandler(event: CustomGenericEvent): void {
		console.log(event);

		const actions = {
			clicked_column: () => {
				// console.log('click column table', event.value);
				this.openDialogTask(event.value.column);
			},
			option_change_status: () => {
				this.updateTask(event.value.column.id, { status: event.value.selected });
			},
			change_paginator: () => {
				this.paginatorTable = event.value;

				this.getAllTasks(this.paginatorTable.pageIndex, this.paginatorTable.pageSize);
			}
		} as any;

		const action = actions[event.action];

		if (!!action) {
			action();
		}
	}

	eventDashboardHandler(event: CustomGenericEvent): void {
		console.log(event);

		const actions = {
			clicked_item: () => {
				this.openDialogTask(event.value.column);
			},
			drag_and_drop: () => {
				this.updateTask(event.value.item.id, { status: event.value.new_status });
			}
		} as any;

		const action = actions[event.action];

		if (!!action) {
			action();
		}
	}

	getMeTasks(): void {
		if (this.selectedView === 'list_view') {
			this.getAllTasks();
		} else {
			this.getAllTasksDashboard();
		}
	}

	getAllTasks(page: number = 0, size: number = 10): void {
		this.tasksSvc.getAllMe(page, size).subscribe({
			next: (res: TableWithPagination<Task>) => {
				this.paginatorTable = {
					length: res.totalElements,
					pageIndex: res.number,
					previousPageIndex: res.number === 0 ? 0 : res.number - 1,
					pageSize: res.size
				};

				this.dataTable = res.content;
			}
		});
	}

	getAllTasksDashboard(): void {
		this.tasksSvc.getAllMeDashboard().subscribe({
			next: (resp) => {
				this.dataGrid = resp;
			}
		});
	}

	updateTask(taskId: number, data: UpdateTask): void {
		this.tasksSvc.updateMe(taskId, data).subscribe({
			next: () => {
				this.utilsSvc.openBasicSnackBar('Task has been updated successfully', this.snackBarConfig);
				this.getAllTasks(this.paginatorTable.pageIndex, this.paginatorTable.pageSize);
			}
		});
	}

	setSelectedView(): string {
		const preferences = JSON.parse(sessionStorage.getItem('user_preferences') ?? '{}');

		return preferences[`dashBoardView`] && preferences[`dashBoardView`] === 'LIST' ? 'list_view' : 'grid_view';
	}

	buildViewMenu(): GenericViewSelectOption[] {
		return [
			{
				id: 'grid_view',
				name: 'Grid',
				value: 'grid_view'
			},
			{
				id: 'list_view',
				name: 'List',
				value: 'list_view'
			}
		];
	}

	buildColumnsTable(): GenericTableColumn[] {
		const optionsTaskStatus = TASK_STATUS;

		return [
			{
				columnDef: 'name',
				header: 'Name',
				cell: (element: any) => `${element.name}`,
				sort: true,
				isSelect: false,
				selectConfig: null
			},
			{
				columnDef: 'description',
				header: 'Description',
				cell: (element: any) => `${element.description}`,
				sort: true,
				isSelect: false,
				selectConfig: null
			},
			{
				columnDef: 'category',
				header: 'Category',
				cell: (element: any) => `${element.category.name}`,
				sort: true,
				isSelect: false,
				selectConfig: null
			},
			{
				columnDef: 'status',
				header: 'Status',
				cell: (element: any) => `${element.status}`,
				sort: true,
				isSelect: true,
				selectConfig: {
					options: optionsTaskStatus,
					optionSelected: (element: any) => `${element.status}`
				}
			}
		];
	}

	openDialogTask(data: Task): void {
		if (!this.isMobile) {
			this.openTaskDetailsWeb(data);
			return;
		}

		this.openTaskDetailsMobile(data);
	}

	openTaskDetailsWeb(data: Task): void {
		this.dialog.open(TaskDetailsComponent, {
			data,
			panelClass: ['task-details-dialog-web'],
			width: '30%',
			height: '100%',
			minWidth: '300px'
		});
	}

	openTaskDetailsMobile(data: Task): void {
		this.dialog.open(TaskDetailsComponent, {
			data,
			panelClass: ['task-details-dialog-mobile'],
			width: '100%',
			height: '100%'
		});
	}
}
