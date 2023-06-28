'use client'

import { transactionFetcher } from '@modules/zksync/hooks/fetchers'
import useSWR from 'swr'
import { Address } from 'wagmi'

export const useGetTransactionsData = (address: Address | null) => {
	const { data, error, isLoading, isValidating } = useSWR(
		address ? [address] : null,
		([address]) => transactionFetcher({ address }),
	)

	return {
		data,
		error,
		isLoading,
		isValidating,
	}
}
