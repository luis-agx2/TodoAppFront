export const errors: { [key: string]: (fieldName: string) => string } = {
	required: (fieldName: string) => `The field ${fieldName} is required.`,
	minlength: (fieldName: string) => `The field ${fieldName} does not satisfy the minimum length requirement`
};
