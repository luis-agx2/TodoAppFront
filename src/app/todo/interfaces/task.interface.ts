export interface Task {
	category: Category;
	description: string;
	endDate: Date;
	id: number;
	name: string;
	status: string;
}

export interface Category {
	color: string;
	description: string;
	name: string;
}

export interface UpdateTask extends Partial<Omit<Task, 'category' | 'id'>> {
	categoryId?: number;
	userId?: number;
}
