'use client'

import { multiTransactionsFetcher } from '@modules/multiple-tracker/hooks/fetchers'
import { useState } from 'react'
import useSWR from 'swr'
import { Address } from 'viem'

const SEPERATOR = '-'

const concatenateAddresses = (
	addresses: Address[],
	separator: string,
): string => {
	return addresses.map((address) => `${address}`).join(separator)
}

export const useGetMultipleTransactionsData = (_addresses: Address[]) => {
	const [shouldFetch, setShouldFetch] = useState<boolean>(true)
	const addresses = concatenateAddresses(_addresses, SEPERATOR)

	const { data, error, isLoading, isValidating } = useSWR(
		shouldFetch ? addresses : null,
		() => multiTransactionsFetcher({ addresses, separator: SEPERATOR }),
		{
			onSuccess: () => setShouldFetch(false),
			onError: () => setShouldFetch(false),
		},
	)

	return {
		data,
		error,
		isLoading,
		isValidating,
		setShouldFetch,
	}
}
