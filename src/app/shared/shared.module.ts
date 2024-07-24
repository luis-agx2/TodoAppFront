import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveControlErrorDirective } from './directives/reactive-control-directive/reactive-control-error.directive';

@NgModule({
	declarations: [ReactiveControlErrorDirective],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [ReactiveControlErrorDirective]
})
export class SharedModule {}
