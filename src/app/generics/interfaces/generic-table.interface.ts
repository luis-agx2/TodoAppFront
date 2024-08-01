export interface GenericTableColumn {
	columnDef: string;
	header: string;
	cell: (element: any) => string;
	sort: boolean;
	isSelect: boolean;
	selectConfig: SelectorGenericTable | null;
}

export interface SelectorGenericTable {
	options: OptionSelectorGenericTable[];
	optionSelected: (element: any) => string;
}

export interface OptionSelectorGenericTable {
	id: string;
	value: string;
	name: string;
}

export interface GenericTablePaginator {
	length: number;
	pageIndex: number;
	pageSize: number;
	previousPageIndex: number;
}
