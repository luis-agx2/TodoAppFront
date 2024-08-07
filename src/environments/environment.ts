// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	baseUrl: 'http://localhost:8080/TodoAppRest/api',
	auth: {
		baseUrl: 'http://localhost:8080/TodoAppRest/api/auth',
		register: 'register'
	},
	preferences: {
		baseUrl: 'http://localhost:8080/TodoAppRest/api/preferences',
		myPreferences: 'me'
	},
	tasks: {
		baseUrl: 'http://localhost:8080/TodoAppRest/api/tasks',
		me: 'me',
		dashboard: 'dashboard'
	},
	comments: {
		baseUrl: 'http://localhost:8080/TodoAppRest/api/comments',
		me: 'me'
	},
	categories: {
		baseUrl: 'http://localhost:8080/TodoAppRest/api/categories',
		me: 'me'
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
