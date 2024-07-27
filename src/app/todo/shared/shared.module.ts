import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
	declarations: [MenuComponent],
	imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule],
	exports: [MenuComponent]
})
export class SharedModule {}
