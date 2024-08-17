import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { map, Observable, of, startWith } from 'rxjs';

@Component({
	selector: 'app-generic-select-autocomplete',
	templateUrl: './generic-select-autocomplete.component.html',
	styleUrls: ['./generic-select-autocomplete.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => GenericSelectAutocompleteComponent),
			multi: true
		}
	]
})
export class GenericSelectAutocompleteComponent implements ControlValueAccessor {
	@Input() set options(items: any[]) {
		this.filteredOptions$ = this.control?.valueChanges.pipe(
			startWith(''),
			map((value) => items?.filter((option) => option?.name?.toLocaleLowerCase()?.includes(value?.toLocaleLowerCase())))
		);
	}

	isDisabled: boolean;
	onChange = (_: any) => {};
	onTouch = () => {};

	selectedValue: any;
	control: FormControl;
	filteredOptions$: Observable<any[]>;

	constructor() {
		this.options = [];
		this.isDisabled = false;
		this.selectedValue = null;
		this.control = new FormControl('');
		this.filteredOptions$ = of([]);
	}

	writeValue(obj: any): void {}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}

	selectOption(event: MatOptionSelectionChange, option: any): void {
		if (event.isUserInput) {
			this.onTouch();
			this.onChange(option);
			this.selectedValue = option;
		}
	}

	keyDown(event: KeyboardEvent): void {
		if (event.key === 'Backspace') {
			this.onTouch();
			this.onChange(null);
			this.selectedValue = null;
		}
	}
}
