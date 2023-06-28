// Example input: 0x703598d9fb00
export const hexToBn = (hex: string) => {
	var highbyte = parseInt(hex.slice(0, 2), 16)
	var bn = BigInt(hex)

	if (0x80 & highbyte) {
		bn =
			BigInt(
				'0b' +
					bn
						.toString(2)
						.split('')
						.map(function (i) {
							return '0' === i ? 1 : 0
						})
						.join(''),
			) + BigInt(1)
		bn = -bn
	}

	return bn
}
