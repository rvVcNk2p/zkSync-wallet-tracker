export const createObjectFromArray = <T>(
	_arr: string[],
	defaultValue: T,
): { [key: string]: T } => {
	return _arr.reduce((obj, string) => {
		obj[string] = defaultValue
		return obj
	}, {} as { [key: string]: T })
}

export const transformResultArrayToObject = <T>(
	_arr: { [key: string]: T }[],
) => {
	return _arr.reduce((result, obj) => {
		for (const [key, value] of Object.entries(obj)) {
			result[key] = value
		}

		return result
	}, {})
}
