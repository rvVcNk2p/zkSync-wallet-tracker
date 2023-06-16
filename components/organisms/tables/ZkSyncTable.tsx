'use client'

import { useGetOnChainBalances, useGetTransactionsData } from '@hooks'
import { useTrackedAddressesStore } from '@stores'
import { DataTable } from '@ui'
import { ChainIds } from '@utils'

import { columns } from './ZkSyncColumns'

const trackedTokens = ['ETH', 'WETH', 'USDC']

export default function ZkSyncTable() {
	const trackedAddresses = useTrackedAddressesStore(
		(state) => state.trackedAddresses,
	)

	const { transactionsData, isLoading, error, isValidating } =
		useGetTransactionsData(trackedAddresses[0])

	const {
		data: balances,
		error: balancesError,
		isValidating: isBalancesValidating,
		isLoading: isBalancesLoading,
	} = useGetOnChainBalances(
		trackedAddresses[0],
		ChainIds.ZK_SYNC_ERA_MAINNET,
		trackedTokens,
	)

	let data = {
		address: trackedAddresses[0],
		...balances,
		...transactionsData,
		bridgedValueInUSD: 0,
	}

	return (
		<div
			className="mx-auto py-10"
			style={{ maxWidth: '-webkit-fill-available' }}
		>
			{balancesError && <div>{balancesError.message}</div>}
			{isBalancesLoading && <div>Loading...</div>}
			{isBalancesValidating && <div>Validating...</div>}
			{balances ? <DataTable columns={columns} data={[data]} /> : null}
		</div>
	)
}
