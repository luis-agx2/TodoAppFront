import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { map, of, startWith } from 'rxjs';

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
	options = [
		{
			id: 1,
			name: 'Deporte',
			description: 'Practicar algún deporte por un determinado tiempo',
			color: '#BA4A00'
		},
		{
			id: 2,
			name: 'Practica',
			description: 'Practicar estructuras de datos',
			color: '#58d68d'
		},
		{
			id: 3,
			name: 'Ejercicio',
			description: 'Realizar actividad fisica por al menos 1 hora',
			color: '#7fb3d5'
		}
	];

	isDisabled: boolean;
	onChange = (_: any) => {};
	onTouch = () => {};

	selectedValue: any;
	control: FormControl;
	filteredOptions$ = of([
		{
			id: 1,
			name: 'Deporte',
			description: 'Practicar algún deporte por un determinado tiempo',
			color: '#BA4A00'
		},
		{
			id: 2,
			name: 'Practica',
			description: 'Practicar estructuras de datos',
			color: '#58d68d'
		},
		{
			id: 3,
			name: 'Ejercicio',
			description: 'Realizar actividad fisica por al menos 1 hora',
			color: '#7fb3d5'
		},
		{
			id: 4,
			name: 'Meditación',
			description: 'Practicar la meditación',
			color: '#27AE60'
		},
		{
			id: 6,
			name: 'Lectura',
			description: 'Practica tu lectura',
			color: '#7FB3D5'
		}
	]);

	constructor() {
		this.isDisabled = false;
		this.selectedValue = null;
		this.control = new FormControl('');

		this.filteredOptions$ = this.control.valueChanges.pipe(
			startWith(''),
			map((value) =>
				this.options.filter((option) => option?.name?.toLocaleLowerCase()?.includes(value?.toLocaleLowerCase()))
			)
		);
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
