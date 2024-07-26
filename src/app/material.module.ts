import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
		MatProgressSpinnerModule
	]
})
export class MaterialModule {}
