import { TestBed } from '@angular/core/testing';

import { UtilsDetailsService } from './utils-details.service';

describe('UtilsDetailsService', () => {
	let service: UtilsDetailsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(UtilsDetailsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
