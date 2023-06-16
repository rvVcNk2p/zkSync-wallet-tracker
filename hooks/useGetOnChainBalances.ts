import { balancesFetcher } from '@fetchers'
import { createObjectFromArray, transformResultArrayToObject } from '@utils'
import useSWR from 'swr'
import { Address } from 'viem'

export const useGetOnChainBalances = (
	address: Address,
	chainId: number,
	tokens: string[],
) => {
	const { data, error, isLoading, isValidating } = useSWR(
		address + tokens.join('-'),
		() => balancesFetcher(address, chainId, tokens),
	)

	let balances = createObjectFromArray<string>(tokens, '0')

	if (data) {
		balances = transformResultArrayToObject<string>(data)
	}

	return {
		data: balances,
		error,
		isLoading,
		isValidating,
	}
}
