import { Component } from '@angular/core';
import { CustomGenericEvent } from '../../../generics/interfaces/custom-events.interface';
import { GenericViewSelectOption } from '../../../generics/interfaces/generic-view-select-options.interface';

@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
	selectedView: string;
	optionsGenericSelectView: GenericViewSelectOption[];

	dataTable = [
		{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', item: 'a' },
		{ position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', item: 'b' },
		{ position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', item: 'c' },
		{ position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', item: 'a' },
		{ position: 5, name: 'Boron', weight: 10.811, symbol: 'B', item: 'a' },
		{ position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', item: 'c' },
		{ position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', item: 'b' },
		{ position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', item: 'b' },
		{ position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', item: 'a' },
		{ position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', item: 'c' }
	];

	columnsTable = [
		{
			width: '100px',
			columnDef: 'position',
			header: 'No.',
			cell: (element: any) => `${element.position}`,
			sort: true,
			isSelect: false
		},
		{
			columnDef: 'name',
			header: 'Name',
			cell: (element: any) => `${element.name}`,
			sort: true,
			isSelect: false
		},
		{
			columnDef: 'weight',
			header: 'Weight',
			cell: (element: any) => `${element.weight}`,
			sort: true,
			isSelect: false
		},
		{
			columnDef: 'symbol',
			header: 'Symbol',
			cell: (element: any) => `${element.symbol}`,
			sort: true,
			isSelect: false
		},
		{
			columnDef: 'select',
			header: 'Select',
			cell: (element: any) => `${element.symbol}`,
			sort: false,
			isSelect: true,
			selectConfig: {
				options: ['a', 'b', 'c'],
				optionSelected: (element: any) => `${element.item}`
			}
		}
	];

	constructor() {
		this.selectedView = 'list_view';
		this.optionsGenericSelectView = this.buildViewMenu();
	}

	onSelectedViewChange(event: CustomGenericEvent): void {
		this.selectedView = event.value;
	}

	eventTableHandler(event: CustomGenericEvent): void {
		console.log(event);

		const actions = {
			clicked_column: () => {
				console.log('click column table', event.value);
			},
			option_change_select: () => {
				console.log('change option select', event.value);
			},
			change_paginator: () => {
				console.log('paginator change', event.value);
			}
		} as any;

		const action = actions[event.action];

		if (!!action) {
			action();
		}
	}

	buildViewMenu(): GenericViewSelectOption[] {
		return [
			{
				id: 'grid_view',
				name: 'Grid',
				value: 'grid_view'
			},
			{
				id: 'list_view',
				name: 'List',
				value: 'list_view'
			}
		];
	}
}
