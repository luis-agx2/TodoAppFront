export interface TableWithPagination<T> {
	content: T[];
	empty: boolean;
	first: boolean;
	last: boolean;
	number: number;
	numberOfElements: number;
	pageable: Pageable;
	size: number;
	sort: Sort;
	totalElements: number;
	totalPages: number;
}

interface Pageable {
	pageNumber: number;
	pageSize: number;
	sort: Sort;
	offset: number;
	unpaged: boolean;
	paged: boolean;
}

interface Sort {
	empty: boolean;
	unsorted: boolean;
	sorted: boolean;
}
