import { multiBalancesFetcher } from '@fetchers'
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

// TODO: Handle each address separately
export const useGetMultiOnChainBalances = (
	addresses: Address[],
	chainId: number,
	tokens: string[],
) => {
	const urls = generateUniqueIdentifier(addresses, chainId, tokens)

	const { data, error, isLoading, isValidating } = useSWR(urls, () =>
		multiBalancesFetcher(urls),
	)

	return {
		data,
		error,
		isLoading,
		isValidating,
	}
}
