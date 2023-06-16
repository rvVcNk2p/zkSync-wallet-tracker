import { multiTransactionsFetcher } from '@fetchers'
import useSWR from 'swr'
import { Address } from 'viem'

const SEPERATOR = '-'

const concatenateAddresses = (
	addresses: Address[],
	separator: string,
): string => {
	return addresses.map((address) => `${address}`).join(separator)
}

// TODO: Handle each address separately
export const useGetMultipleTransactionsData = (_addresses: Address[]) => {
	const addresses = concatenateAddresses(_addresses, SEPERATOR)

	const { data, error, isLoading, isValidating } = useSWR(addresses, () =>
		multiTransactionsFetcher({ addresses, separator: SEPERATOR }),
	)

	return {
		data,
		error,
		isLoading,
		isValidating,
	}
}
