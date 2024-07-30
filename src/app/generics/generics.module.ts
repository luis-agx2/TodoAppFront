import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { GenericViewSelectComponent } from './components/generic-view-select/generic-view-select.component';
import { ReactiveControlErrorDirective } from './directives/reactive-control-directive/reactive-control-error.directive';

@NgModule({
	declarations: [ReactiveControlErrorDirective, GenericViewSelectComponent, GenericTableComponent],
	imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
	exports: [ReactiveControlErrorDirective, GenericViewSelectComponent, GenericTableComponent]
})
export class GenericsModule {}
