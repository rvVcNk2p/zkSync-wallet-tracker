import { tokenAddresses } from '@utils'
import { fetchBalance } from '@wagmi/core'
import { Address, formatUnits } from 'viem'

type BalancesResult = {
	[token: string]: string
}

export const balancesFetcher = async (
	address: Address,
	chainId: number,
	tokens: string[],
): Promise<BalancesResult[]> => {
	return await Promise.all(
		tokens.map(async (token) => {
			const tokenAddress: `0x${string}` = tokenAddresses[chainId][token]
			const balance = await fetchBalance({ address, token: tokenAddress })

			return {
				[token]: Number(formatUnits(balance.value, balance.decimals)).toFixed(
					4,
				),
			}
		}),
	)
}
