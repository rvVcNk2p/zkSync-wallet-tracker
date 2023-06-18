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

export const generateLimitAndOffsetArray = (
	limit: number,
	totalSize: number,
) => {
	const offsetArray = []
	let remainingNumber = totalSize

	for (let i = 1; i < Math.ceil(totalSize / limit); i++) {
		const offset = Math.min(limit, remainingNumber - limit)
		offsetArray.push({ limit: offset, offset: limit * i })
		remainingNumber -= limit
	}

	return offsetArray
}
