import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { SharedModule } from './shared/shared.module';
import { TodoRoutingModule } from './todo-routing.module';

@NgModule({
	declarations: [LayoutComponent, TasksComponent],
	imports: [CommonModule, TodoRoutingModule, SharedModule, MaterialModule]
})
export class TodoModule {}
