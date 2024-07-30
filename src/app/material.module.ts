import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
	declarations: [],
	exports: [
		MatDividerModule,
		MatIconModule,
		MatButtonModule,
		MatSlideToggleModule,
		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,
		MatSnackBarModule,
		MatProgressSpinnerModule,
		MatToolbarModule,
		MatSelectModule,
		MatTableModule,
		MatSortModule,
		MatMenuModule,
		MatPaginatorModule
	]
})
export class MaterialModule {}
