import { HttpContext, HttpContextToken } from '@angular/common/http';

export const ADD_SPINNER = new HttpContextToken<boolean>(() => true);

export function noAddSpinner() {
	return new HttpContext().set(ADD_SPINNER, false);
}
