import { ErrorMessage } from '../interfaces/error-message.interface';

export const errors = {
	required: (fieldName: string) => `The field ${fieldName} is required.`,
	minlength: (fieldName: string) => `The field ${fieldName} does not satisfy the minimum length requirement`,
	maxlength: (fieldName: string) => `The field ${fieldName} does not satisfy the maximum length requirement`
} as ErrorMessage;
