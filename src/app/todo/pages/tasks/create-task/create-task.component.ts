import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UtilsService } from '../../../../generics/services/utils-service/utils.service';
import { Category } from '../../../interfaces/task.interface';
import { CategoriesService } from '../../../services/categories-service/categories.service';

@Component({
	selector: 'app-create-task',
	templateUrl: './create-task.component.html',
	styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
	showSpinner$: Observable<boolean>;
	categories: Category[];

	formCreate: FormGroup;
	constructor(
		private location: Location,
		private fb: FormBuilder,
		private utilsSvc: UtilsService,
		private categoriesSvc: CategoriesService
	) {
		this.formCreate = this.fb.group({
			name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
			description: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
			startDate: [null, [Validators.required]],
			category: [null, [Validators.required]]
		});

		this.showSpinner$ = this.utilsSvc.spinnerLoading();
		this.categories = [];
	}

	ngOnInit(): void {
		this.getAllCategories();
	}

	getAllCategories(): void {
		this.categoriesSvc.getAllCategories().subscribe({
			next: (resp) => {
				this.categories = resp;
				console.log(resp);
			}
		});
	}

	sendSubmit(): void {
		if (this.formCreate.invalid) {
			this.formCreate.markAllAsTouched();
			return;
		}

		const { name, description, startDate, categoryId } = this.formCreate.getRawValue();
	}

	goBack(): void {
		this.location.back();
	}
}
