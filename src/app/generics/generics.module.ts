import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GenericViewSelectComponent } from './components/generic-view-select/generic-view-select.component';
import { ReactiveControlErrorDirective } from './directives/reactive-control-directive/reactive-control-error.directive';

@NgModule({
	declarations: [ReactiveControlErrorDirective, GenericViewSelectComponent],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [ReactiveControlErrorDirective, GenericViewSelectComponent]
})
export class GenericsModule {}
