import { transactionFetcher } from '@fetchers'
import useSWR from 'swr'
import { Address } from 'wagmi'

export const useGetTransactionsData = (address: Address) => {
	const { data, error, isLoading, isValidating } = useSWR(
		address ? address : null,
		() => transactionFetcher({ address }),
	)

	return {
		data,
		error,
		isLoading,
		isValidating,
	}
}
