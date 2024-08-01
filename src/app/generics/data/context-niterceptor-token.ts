import { HttpContext, HttpContextToken } from '@angular/common/http';

export const ADD_TOKEN = new HttpContextToken<boolean>(() => true);

export function noAddToken() {
	return new HttpContext().set(ADD_TOKEN, false);
}
