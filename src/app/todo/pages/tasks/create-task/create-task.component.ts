import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { UtilsService } from '../../../../generics/services/utils-service/utils.service';
import { Category, Task } from '../../../interfaces/task.interface';
import { CategoriesService } from '../../../services/categories-service/categories.service';
import { TasksService } from '../../../services/tasks-service/tasks.service';

@Component({
	selector: 'app-create-task',
	templateUrl: './create-task.component.html',
	styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
	showSpinner$: Observable<boolean>;
	categories: Category[];
	task: Task | null;
	isEditMode: boolean;

	formCreate: FormGroup;
	constructor(
		private location: Location,
		private fb: FormBuilder,
		private utilsSvc: UtilsService,
		private categoriesSvc: CategoriesService,
		private tasksSvc: TasksService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {
		this.formCreate = this.fb.group({
			name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
			description: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
			startDate: [null, [Validators.required]],
			endDate: [null],
			category: [null, [Validators.required]],
			status: [null, [Validators.required]]
		});

		this.showSpinner$ = this.utilsSvc.spinnerLoading();
		this.categories = [];
		this.task = null;
		this.isEditMode = false;
	}

	ngOnInit(): void {
		this.activatedRoute.params
			.pipe(
				switchMap(({ id }) => {
					return forkJoin({
						task_edit: !!id ? this.tasksSvc.getMe(id) : of(null),
						categories: this.categoriesSvc.getAllCategories()
					});
				})
			)
			.subscribe({
				next: (data) => {
					this.isEditMode = !!data.task_edit;
					this.categories = data.categories;

					if (this.isEditMode) {
						this.task = data.task_edit;
						this.patchEditForm();
					}
				}
			});
	}

	patchEditForm(): void {
		const { name, description, startDate, endDate, category, status } = this.task!;

		this.formCreate.patchValue({ name, description, startDate, endDate, category, status });
	}

	sendSubmit(): void {
		if (this.formCreate.invalid) {
			this.formCreate.markAllAsTouched();
			return;
		}

		if (!this.isEditMode) {
			this.createTask();
		} else {
			this.updateTask();
		}
	}

	createTask(): void {
		const {
			name,
			description,
			startDate,
			category: { id: categoryId }
		} = this.formCreate.getRawValue();

		const task = { name, description, startDate, categoryId, userId: 1 };

		this.tasksSvc.createMe(task).subscribe({
			next: () => {
				this.utilsSvc.openBasicSnackBar('The task has been registered successfully', {
					panelClass: 'mat-snack-bar-success'
				});

				this.router.navigate(['/my-tasks']);
			}
		});
	}

	updateTask(): void {
		const {
			name,
			description,
			startDate,
			category: { id: categoryId },
			endDate,
			status
		} = this.formCreate.getRawValue();

		const task = { name, description, startDate, categoryId, userId: 1, endDate, status };

		this.tasksSvc.updateMe(this.task?.id!, task).subscribe({
			next: () => {
				this.utilsSvc.openBasicSnackBar('The task has been updated successfully', {
					panelClass: 'mat-snack-bar-success'
				});

				this.router.navigate(['/my-tasks']);
			}
		});
	}

	goBack(): void {
		this.location.back();
	}
}
