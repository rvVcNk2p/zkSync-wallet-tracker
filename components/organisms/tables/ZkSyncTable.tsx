'use client'

import {
	useGetMultiOnChainBalances,
	useGetMultipleTransactionsData,
} from '@hooks'
import { useTrackedAddressesStore } from '@stores'
import { DataTable } from '@ui'
import { ChainIds, transformResultArrayToObject } from '@utils'
import { useEffect } from 'react'

import { columns } from './ZkSyncColumns'

const trackedTokens = ['ETH', 'WETH', 'USDC']

export default function ZkSyncTable() {
	const trackedAddresses = useTrackedAddressesStore(
		(state) => state.trackedAddresses,
	)
	const getTrackedAddresses = useTrackedAddressesStore(
		(state) => state.getTrackedAddresses,
	)

	const updateTrackedAddress = useTrackedAddressesStore(
		(state) => state.updateTrackedAddress,
	)

	const {
		data: multipleBalances,
		error: multipleBalancesError,
		isLoading: multipleBalancesLoading,
		isValidating: multipleBalancesValidating,
	} = useGetMultiOnChainBalances(
		getTrackedAddresses(),
		ChainIds.ZK_SYNC_ERA_MAINNET,
		trackedTokens,
	)

	const {
		data: multipleTransactionsData,
		error: multipleTransactionsError,
		isLoading: multipleTransactionsLoading,
		isValidating: multipleTransactionsValidating,
	} = useGetMultipleTransactionsData(getTrackedAddresses())

	useEffect(() => {
		if (multipleTransactionsData && multipleBalances) {
			updateTrackedAddress(
				trackedAddresses.map((addressData: any) => {
					const transactionData = multipleTransactionsData.find(
						(transaction: any) => transaction.address === addressData.address,
					)

					const balance = multipleBalances.find(
						(balance: any) => balance.address === addressData.address,
					)

					return transactionData && balance
						? {
								...addressData,
								...transactionData.data,
								...transformResultArrayToObject(balance.data),
						  }
						: { ...addressData }
				}),
			)
		}
	}, [multipleTransactionsData, multipleBalances])

	const isLoding =
		multipleBalancesLoading ||
		multipleTransactionsLoading ||
		multipleBalancesValidating ||
		multipleTransactionsValidating

	return (
		<div
			className="mx-auto py-10"
			style={{ maxWidth: '-webkit-fill-available' }}
		>
			<DataTable
				columns={columns}
				data={trackedAddresses}
				isLoading={isLoding}
			/>
		</div>
	)
}
