import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { CustomGenericEvent } from '../../interfaces/custom-events.interface';

@Component({
	selector: 'app-generic-table',
	templateUrl: './generic-table.component.html',
	styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent {
	@Input() set dataTable(dataTable: any[]) {
		this.dataSource = dataTable ?? [];
		this.lengthData = dataTable?.length ?? 0;
	}

	@Input() set columnsTable(columnsTable: any[]) {
		this.columns = columnsTable ?? [];
		this.displayedColumns = columnsTable.map((c) => c.columnDef);
	}

	@Input() pageSize: number;
	@Input() pageSizeOptions: number[];

	columns: any[];
	dataSource: any[];
	displayedColumns: string[];

	lengthData: number;

	@Output() tableEvent = new EventEmitter<CustomGenericEvent>();
	@Output() paginatorEvent = new EventEmitter<CustomGenericEvent>();

	constructor() {
		this.dataSource = [];
		this.columns = [];
		this.displayedColumns = [];
		this.lengthData = 0;
		this.pageSize = 10;
		this.pageSizeOptions = [5, 10];
	}

	clickColumn(itemClicked: any): void {
		this.emitTableEvent('clicked_column', { column: itemClicked });
	}

	changeSelect(selectChange: MatSelectChange, row: any, column: any): void {
		const value = {
			selected: selectChange.value,
			column: row
		};

		this.emitTableEvent(`option_change_${column}`, value);
	}

	paginatorChange(event: any): void {
		this.emitTableEvent('change_paginator', event);
	}

	emitTableEvent(action: string, value: any): void {
		this.tableEvent.emit({ action, value });
	}
}
