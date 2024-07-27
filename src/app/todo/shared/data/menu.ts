import { Menu, MenuItem } from '../interfaces/menu-item.interface';

const MENU_USER: MenuItem[] = [
	{ id: 'home', icon: 'home', path: '/', name: 'Home' },
	{ id: 'tasks-user', icon: 'tasks', path: '/my-tasks', name: 'My Tasks' }
];

const MENU_ADMIN: MenuItem[] = [
	{ id: 'home', icon: 'home', path: '/', name: 'Home' },
	{ id: 'tasks-admin', icon: 'import_contacts', path: '/tasks', name: 'Tasks' },
	{ id: 'users-admin', icon: 'group', path: '/users', name: 'User' }
];

export const MENU: Menu = {
	USER: MENU_USER,
	ADMIN: MENU_ADMIN
};
