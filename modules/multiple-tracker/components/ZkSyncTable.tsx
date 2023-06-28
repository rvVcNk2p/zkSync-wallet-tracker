'use client'

import { ChainIds } from '@constants'
import {
	useGetMultiOnChainBalances,
	useGetMultipleTransactionsData,
	usePrevious,
} from '@hooks'
import { Button, Label } from '@modules/shared/components/atoms'
import { DataTable } from '@modules/shared/components/atoms/data-table'
import { AddNewAddressModal } from '@molecules'
import { ArrowsClockwise, Plus } from '@phosphor-icons/react'
import { useTrackedAddressesStore } from '@stores'
import { transformResultArrayToObject } from '@utils'
import { useEffect, useState } from 'react'

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
		setShouldFetch: setShouldFetchBalances,
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
		setShouldFetch: setShouldFetchTransactions,
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

					return transactionData
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
		multipleTransactionsLoading ||
		multipleTransactionsValidating ||
		multipleBalancesLoading ||
		multipleBalancesValidating

	const [isRefreshAvailable, setIsRefreshAvailable] = useState(true)

	const handleFetchTrigger = () => {
		setIsRefreshAvailable(false)

		setShouldFetchTransactions(true)
		setShouldFetchBalances(true)

		setTimeout(() => {
			setIsRefreshAvailable(true)
		}, 5000)
	}

	const prevTrackedAddresse = usePrevious<`0x${string}`[]>(
		getTrackedAddresses(),
	)

	useEffect(() => {
		if (
			prevTrackedAddresse &&
			getTrackedAddresses().length > prevTrackedAddresse?.length
		) {
			// Delay to allow the new address to be added to the store
			setTimeout(() => {
				handleFetchTrigger()
			}, 1000)
		}
	}, [getTrackedAddresses()])

	return (
		<div className="flex flex-col items-end py-10 gap-4">
			<div className="flex gap-4">
				<AddNewAddressModal>
					<Button className="w-fit">
						<Plus className="mr-2" />
						Add new address
					</Button>
				</AddNewAddressModal>
				<Button
					className="w-fit"
					disabled={isLoding || !isRefreshAvailable}
					onClick={handleFetchTrigger}
				>
					<ArrowsClockwise className="mr-2" />
					{isRefreshAvailable ? 'Refresh' : 'Wait 5 seconds to refresh'}
				</Button>
			</div>
			<div className="mx-auto" style={{ maxWidth: '-webkit-fill-available' }}>
				<DataTable
					columns={columns}
					data={trackedAddresses}
					isLoading={isLoding}
				/>
			</div>
			<Label className="text-xs italic">
				*Refresh does not happen automatically; you need to click the
				&apos;Refresh&apos; button.
			</Label>
		</div>
	)
}
