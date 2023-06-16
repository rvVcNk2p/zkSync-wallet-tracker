'use client'

import { Button, Card, Input, Label } from '@/components/ui'
import { useGetOnChainBalances, useGetTransactionsData, useToast } from '@hooks'
import { Trash } from '@phosphor-icons/react'
import { useTrackedAddressesStore } from '@stores'
import { ChainIds } from '@utils'
import moment from 'moment'
import { useState } from 'react'

export default function DashboardPage() {
	const { toast } = useToast()

	const [newAddress, setNewAddress] = useState('')

	const trackedAddresses = useTrackedAddressesStore(
		(state) => state.trackedAddresses,
	)
	const addTrackedAddress = useTrackedAddressesStore(
		(state) => state.addTrackedAddress,
	)
	const removeTrackedAddress = useTrackedAddressesStore(
		(state) => state.removeTrackedAddress,
	)

	const handleAddTrackedAddress = (newAddress: string) => {
		if (trackedAddresses.includes(newAddress)) {
			toast({
				title: '❌ Duplicated address error!',
				description: 'Address already tracked.',
				duration: 5000,
				variant: 'destructive',
			})
			return
		}
		addTrackedAddress(newAddress)
		toast({
			title: '✅ New address added!',
			description: newAddress,
			duration: 5000,
		})
		setNewAddress('')
	}

	const handleRemoveTrackedAddress = (address: string) => {
		removeTrackedAddress(address)
		toast({
			title: '✅ Address removed!',
			description: address,
			duration: 5000,
		})
	}

	const { transactionsData, isLoading, error, isValidating } =
		useGetTransactionsData(trackedAddresses[0])

	const trackedTokens = ['ETH', 'WETH', 'USDC']

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

	return (
		<div className="p-2">
			<div className="grid grid-cols-1">
				<div className="blog-list__container">
					<div className="w-fit mt-6 mx-auto">DASHBOARD</div>
					<div className="grid mt-10 gap-4 grid-cols-2">
						<Card className="p-4">
							<Label>Address:</Label>
							<Input
								value={newAddress}
								onChange={(e) => setNewAddress(e.target.value)}
							></Input>
							<Button
								className="flex mt-4 w-full"
								disabled={newAddress.length !== 42}
								onClick={() => handleAddTrackedAddress(newAddress)}
							>
								Add new address
							</Button>
						</Card>
						<Card className="p-4">
							<h1 className="underline">Tracked Addresses</h1>
							{trackedAddresses.map((address) => (
								<div
									className="flex justify-between items-center"
									key={address}
								>
									<div>{address}</div>
									<Trash
										className="cursor-pointer"
										size={20}
										onClick={() => handleRemoveTrackedAddress(address)}
									/>
								</div>
							))}
						</Card>
					</div>
				</div>
				<div>
					<Card className="p-4 mt-6">
						<h1 className="underline">Transactions Data</h1>
						{isLoading && <div>Loading...</div>}
						{error && <div>Error!</div>}
						{isValidating && <div>Validating...</div>}
						{transactionsData.transactionCount ? (
							<div className="mt-2">
								<div>
									Transaction Volume (USD):{' $'}
									{transactionsData.transactionVolumeInUSD}
								</div>
								<div>Gas Cost (USD): ${transactionsData.gasFeeCostInUSD}</div>
								{/* <div>Bridged Value (USD): In progress...</div> */}
								<hr className="my-2" />
								<div>
									Transaction Count: {transactionsData.transactionCount}
								</div>
								<div>
									Last Transaction:{' '}
									{moment(transactionsData?.lastTransaction?.receivedAt)
										.startOf('minute')
										.fromNow()}
								</div>
								<div>Active day(s): {transactionsData.activeDays}</div>
								<div>Active week(s): {transactionsData.activeWeeks}</div>
								<div>Active month(s): {transactionsData.activeMonths}</div>
							</div>
						) : null}
					</Card>
					<Card className="p-4 mt-6">
						<h1 className="underline"> Balance </h1>
						{isBalancesLoading && <div>Loading...</div>}
						{isBalancesValidating && <div>Validating...</div>}
						{balancesError && <div>Error!</div>}
						{balances ? (
							<div className="mt-2">
								<div>ETH: {balances['ETH']}</div>
								<div>WETH: {balances['WETH']}</div>
								<div>USDC: {balances['USDC']}</div>
							</div>
						) : null}
					</Card>
				</div>
			</div>
		</div>
	)
}
