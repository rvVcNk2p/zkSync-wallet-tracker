'use client'

import { multiBalancesFetcher } from '@modules/shared/hooks/fetchers'
import { useState } from 'react'
import useSWR from 'swr'
import { Address } from 'viem'

const generateUniqueIdentifier = (
	addresses: Address[],
	chainId: number,
	tokens: string[],
) => {
	return addresses
		.map((address) => `${address}|${chainId}|${tokens.join('-')}`)
		.join('=')
}

export const useGetMultiOnChainBalances = (
	addresses: Address[],
	chainId: number,
	tokens: string[],
) => {
	const [shouldFetch, setShouldFetch] = useState<boolean>(true)
	const urls = generateUniqueIdentifier(addresses, chainId, tokens)

	const { data, error, isLoading, isValidating } = useSWR(
		shouldFetch ? urls : null,
		() => multiBalancesFetcher(urls),
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
