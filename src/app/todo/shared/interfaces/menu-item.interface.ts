export interface MenuItem {
	id: string;
	icon: string;
	path: string;
	name: string;
}

export interface Menu {
	[key: string]: MenuItem[];
}
