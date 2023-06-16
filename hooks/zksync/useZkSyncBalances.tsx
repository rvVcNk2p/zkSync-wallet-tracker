import { defaultFetcher } from '@fetchers'
import type { TokenBalanceResponse } from '@types'
import { createObjectFromArray } from '@utils'
import useSWR from 'swr'
import { Address, formatUnits } from 'viem'

// Deprecated, use instead useGetOnChainBalances
const BALANCES_URL =
	'https://zksync2-mainnet.zkscan.io/api?module=account&action=tokenlist&address='

export const useZkSyncBalances = (address: Address, tokens: string[]) => {
	const balances = createObjectFromArray<string>(tokens, '0')

	const { data, error, isLoading, isValidating } = useSWR(
		address ? BALANCES_URL + address : null,
		defaultFetcher<TokenBalanceResponse>,
	)

	if (data?.result) {
		tokens.map((token) => {
			if (data?.result) {
				const balance = data?.result.find((t) => t.symbol === token)
				if (balance) {
					balances[token] = parseFloat(
						formatUnits(BigInt(balance.balance), parseInt(balance.decimals)),
					).toFixed(4)
				}
			}
		})
	}

	return {
		balances,
		error,
		isLoading,
		isValidating,
	}
}
