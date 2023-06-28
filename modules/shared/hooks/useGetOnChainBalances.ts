'use client'

import { balancesFetcher } from '@modules/shared/hooks/fetchers'
import useSWR from 'swr'
import { Address } from 'viem'

export const useGetOnChainBalances = (
	address: Address | null,
	chainId: number,
	tokens: string[],
) => {
	const { data, error, isLoading, isValidating } = useSWR(
		address ? [address + '-' + tokens.join('-'), address] : null,
		([_, address]) => balancesFetcher(address, chainId, tokens),
	)

	return {
		data,
		error,
		isLoading,
		isValidating,
	}
}
