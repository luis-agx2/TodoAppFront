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
