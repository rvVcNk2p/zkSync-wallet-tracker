import { defaultFetcher } from '@fetchers'
import { TokenBalanceResponse } from '@types'
import { tokenAddresses } from '@utils'
import useSWR from 'swr'
import { Address, formatUnits } from 'viem'
import { zkSync } from 'viem/chains'
import { useBalance } from 'wagmi'

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
	const balances = createObjectFromArray(tokens)

	const { data, error, isLoading, isValidating } = useSWR(
		address ? BALANCES_URL + address : null,
		defaultFetcher<TokenBalanceResponse>,
	)

	const mainToken = useBalance({
		address: address,
		chainId: zkSync.id,
	})
	const wethToken = useBalance({
		address: address,
		chainId: zkSync.id,
		token: tokenAddresses[zkSync.id]['WETH'],
	})
	const usdcToken = useBalance({
		address: address,
		chainId: zkSync.id,
		token: tokenAddresses[zkSync.id]['USDC'],
	})

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
	} else {
		if (mainToken.data && wethToken.data && usdcToken.data) {
			balances['ETH'] = parseFloat(mainToken.data?.formatted).toFixed(4)
			balances['WETH'] = parseFloat(wethToken.data?.formatted).toFixed(4)
			balances['USDC'] = parseFloat(usdcToken.data?.formatted).toFixed(4)
		}
	}

	return {
		balances,
		error,
		isLoading,
		isValidating,
	}
}
