import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { CreateTaskComponent } from './pages/tasks/create-task/create-task.component';
import { TasksComponent } from './pages/tasks/tasks.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: '',
				component: HomeComponent
			},
			{
				path: 'my-tasks',
				component: TasksComponent
			},
			{
				path: 'create-task',
				component: CreateTaskComponent
			},
			{
				path: 'preferences',
				component: PreferencesComponent
			},
			{
				path: '**',
				redirectTo: 'my-tasks'
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TodoRoutingModule {}
