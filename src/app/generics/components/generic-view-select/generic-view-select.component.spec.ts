import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericViewSelectComponent } from './generic-view-select.component';

describe('GenericViewSelectComponent', () => {
	let component: GenericViewSelectComponent;
	let fixture: ComponentFixture<GenericViewSelectComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [GenericViewSelectComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(GenericViewSelectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
