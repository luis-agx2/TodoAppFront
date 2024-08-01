import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { CustomGenericEvent } from '../../interfaces/custom-events.interface';
import { GenericTablePaginator } from '../../interfaces/generic-table.interface';

@Component({
	selector: 'app-generic-table',
	templateUrl: './generic-table.component.html',
	styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent {
	@Input() set dataTable(dataTable: any[]) {
		this.dataSource = dataTable ?? [];
		console.log(this.dataSource);
	}

	@Input() set columnsTable(columnsTable: any[]) {
		this.columns = columnsTable ?? [];
		this.displayedColumns = columnsTable.map((c) => c.columnDef);
	}

	@Input() paginator: GenericTablePaginator;
	@Input() pageSizeOptions: number[];

	columns: any[];
	dataSource: any[];
	displayedColumns: string[];

	@Output() tableEvent = new EventEmitter<CustomGenericEvent>();
	@Output() paginatorEvent = new EventEmitter<CustomGenericEvent>();

	constructor() {
		this.dataSource = [];
		this.columns = [];
		this.displayedColumns = [];
		this.paginator = { length: 0, pageIndex: 0, previousPageIndex: 0, pageSize: 10 };
		this.pageSizeOptions = [1, 5, 10];
	}

	clickColumn(itemClicked: any): void {
		this.emitTableEvent('clicked_column', { column: { ...itemClicked } });
	}

	changeSelect(selectChange: MatSelectChange, row: any, column: any): void {
		const value = {
			selected: selectChange.value,
			column: { ...row }
		};

		this.emitTableEvent(`option_change_${column}`, value);
	}

	paginatorChange(event: any): void {
		this.emitTableEvent('change_paginator', { ...event });
	}

	emitTableEvent(action: string, value: any): void {
		this.tableEvent.emit({ action, value });
	}
}
