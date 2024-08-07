import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericSelectAutocompleteComponent } from './generic-select-autocomplete.component';

describe('GenericSelectAutocompleteComponent', () => {
	let component: GenericSelectAutocompleteComponent;
	let fixture: ComponentFixture<GenericSelectAutocompleteComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [GenericSelectAutocompleteComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(GenericSelectAutocompleteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
