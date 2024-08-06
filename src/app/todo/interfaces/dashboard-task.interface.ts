import { Task } from './task.interface';

export interface DashboardTask {
	cancelled: Task[];
	completed: Task[];
	inProgress: Task[];
	news: Task[];
	paused: Task[];
}
