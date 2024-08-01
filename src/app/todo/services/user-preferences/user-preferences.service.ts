import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UserPreferencesService {
	constructor(private http: HttpClient) {}

	getMyPreferences(): Observable<any> {
		const url = `${environment.preferences.baseUrl}/${environment.preferences.myPreferences}`;

		return this.http.get(url);
	}
}
