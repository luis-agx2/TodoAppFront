import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GenericsModule } from '../generics/generics.module';
import { MaterialModule } from '../material.module';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { SharedModule } from './shared/shared.module';
import { TodoRoutingModule } from './todo-routing.module';

@NgModule({
	declarations: [LayoutComponent, TasksComponent, HomeComponent, PreferencesComponent],
	imports: [CommonModule, TodoRoutingModule, SharedModule, MaterialModule, GenericsModule]
})
export class TodoModule {}
