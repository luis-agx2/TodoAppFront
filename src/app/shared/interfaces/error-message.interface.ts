export interface ErrorMessage {
	[key: string]: (fieldName: string) => string;
}
