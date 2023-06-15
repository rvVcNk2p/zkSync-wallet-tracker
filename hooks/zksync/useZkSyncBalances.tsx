import { TokenBalanceResponse } from '@types'
import { ChainIds } from '@utils'
import { tokenAddresses } from '@utils'
import useSWR from 'swr'
import { Address, formatUnits } from 'viem'

import { rpcFetcher } from '..'

const createObjectFromArray = (
	strings: string[],
): { [key: string]: string } => {
	return strings.reduce((obj, string) => {
		obj[string] = '0'
		return obj
	}, {} as { [key: string]: string })
}

const BALANCES_URL =
	'https://zksync2-mainnet.zkscan.io/api?module=account&action=tokenlist&address='

export const useZkSyncBalances = (address: Address, tokens: string[]) => {
	const { data, error, isLoading, isValidating } = useSWR(
		address ? BALANCES_URL + address : null,
		rpcFetcher<TokenBalanceResponse>,
	)

	const balances = createObjectFromArray(tokens)

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
		data: balances,
		error,
		isValidating,
		isLoading,
	}
}
