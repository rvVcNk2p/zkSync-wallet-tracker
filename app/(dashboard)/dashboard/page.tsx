'use client'

import { Button, Card, Input, Label } from '@/components/ui'
import { useToast } from '@hooks'
import { ZkSyncTable } from '@organisms'
import { useTrackedAddressesStore } from '@stores'
import { useState } from 'react'

export default function DashboardPage() {
	const { toast } = useToast()

	const [newAddress, setNewAddress] = useState<`0x${string}`>('0x')

	const trackedAddresses = useTrackedAddressesStore(
		(state) => state.getTrackedAddresses,
	)
	const addTrackedAddress = useTrackedAddressesStore(
		(state) => state.addTrackedAddress,
	)

	const handleAddTrackedAddress = (newAddress: `0x${string}`) => {
		if (trackedAddresses().includes(newAddress)) {
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
		setNewAddress('0x')
	}

	return (
		<div className="p-2">
			<div className="grid grid-cols-1">
				<div className="blog-list__container">
					<div className="w-fit mt-6 mx-auto">zkSync Activity Tracker</div>
					<div className="grid mt-10 grid-cols-1">
						<Card className="p-4">
							<Label>Address:</Label>
							<Input
								value={newAddress}
								onChange={(e) => setNewAddress(e.target.value as `0x${string}`)}
							></Input>
							<Button
								className="flex mt-4 w-full"
								disabled={newAddress.length !== 42}
								onClick={() => handleAddTrackedAddress(newAddress)}
							>
								Add new address
							</Button>
						</Card>
					</div>
				</div>
				<ZkSyncTable />
			</div>
		</div>
	)
}
