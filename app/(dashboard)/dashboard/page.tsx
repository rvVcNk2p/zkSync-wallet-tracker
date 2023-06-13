'use client'

import { Button, Card, Input, Label } from '@/components/ui'
import { useToast } from '@hooks'
import { Trash } from '@phosphor-icons/react'
import { useTrackedAddressesStore } from '@stores'
import { useEffect, useState } from 'react'

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
			</div>
		</div>
	)
}
