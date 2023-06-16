import { balancesFetcher } from '@fetchers'
import { Address } from 'viem'

type BalanceMultiFetcherData = {
	address: Address
	chainId: number
	tokens: string[]
}

export const multiBalancesFetcher = async (args: string): Promise<any> => {
	const data: BalanceMultiFetcherData[] = args.split('=').map((_address) => {
		const [address, chainId, tokens] = _address.split('|')
		return {
			address,
			chainId,
			tokens: tokens.split('-'),
		} as unknown as BalanceMultiFetcherData
	})

	return await Promise.all(
		data.map(async (singleRequest) => {
			const balances = await singleBalancesByAddress(
				singleRequest.address,
				singleRequest.chainId,
				singleRequest.tokens,
			)
			return { data: balances, address: singleRequest.address }
		}),
	)
}

const singleBalancesByAddress = (
	address: Address,
	chainId: number,
	tokens: string[],
): Promise<any[]> => balancesFetcher(address, chainId, tokens)
