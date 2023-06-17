'use client'

import { transactionFetcher } from '@fetchers'
import useSWR from 'swr'
import { Address } from 'wagmi'

export const useGetTransactionsData = (address: Address | null) => {
	const { data, error, isLoading, isValidating } = useSWR(
		address ? address : null,
		(_address) => transactionFetcher({ address: _address }),
	)

	return {
		data,
		error,
		isLoading,
		isValidating,
	}
}
