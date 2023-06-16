import { transactionFetcher } from '@fetchers'

type MultiTransactionsFetcherProps = {
	addresses: string
	separator: string
}

export const multiTransactionsFetcher = async ({
	addresses,
	separator,
}: MultiTransactionsFetcherProps): Promise<any> => {
	const data = addresses.split(separator) as `0x${string}`[]

	return await Promise.all(
		data.map(async (address) => {
			try {
				const result = await singleTransactionByAddress(address)
				return result
			} catch (error) {
				return { address: null }
			}
		}),
	)
}

const singleTransactionByAddress = (address: `0x${string}`): Promise<any[]> =>
	transactionFetcher({ address })
