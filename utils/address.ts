export const shortenerAddress = (
	address: string,
	prefix: number = 4,
	sufix: number = 4,
) => {
	return address.slice(0, prefix) + '...' + address.slice(-sufix)
}
