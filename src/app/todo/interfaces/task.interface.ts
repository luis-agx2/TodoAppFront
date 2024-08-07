export interface Task {
	category: Category;
	description: string;
	endDate: Date | null;
	startDate: Date;
	id: number;
	name: string;
	status: string;
}

export interface Category {
	id: number;
	color: string;
	description: string;
	name: string;
}

export interface CreateTask extends Partial<Omit<Task, 'category' | 'id'>> {
	categoryId?: number;
	userId?: number;
}

export interface UpdateTask extends CreateTask {}
