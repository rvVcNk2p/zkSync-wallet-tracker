import { ChainIds } from '@utils'
import { tokenAddresses } from '@utils'
import { Address } from 'viem'
import { useBalance } from 'wagmi'

export const useBalances = (
	address: Address,
	chainId: ChainIds,
	tokens: string[],
) => {
	// TODO: Implementation only works for ERC-20 tokens that hase balanceOf() function
	const { data, error, isLoading, isFetching } = useBalance({
		address,
		chainId: chainId,
		token: tokenAddresses[chainId][tokens[0]],
	})

	return {
		data,
		error,
		isValidating: isFetching,
		isLoading,
	}
}
