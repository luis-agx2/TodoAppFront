import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { DashboardItemComponent } from './components/dashboard-item/dashboard-item.component';

@NgModule({
	declarations: [MenuComponent, DashboardComponent, TaskDetailsComponent, DashboardItemComponent],
	imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule],
	exports: [MenuComponent, DashboardComponent]
})
export class SharedModule {}
