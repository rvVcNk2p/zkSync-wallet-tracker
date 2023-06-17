'use client'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useToast } from '@hooks'
import { Plus } from '@phosphor-icons/react'
import { useTrackedAddressesStore } from '@stores'
import { Button, Input } from '@ui'
import { useState } from 'react'

interface AddNewAddressModalProps {
	children: React.ReactNode
}

const AddNewAddressModal = ({ children }: AddNewAddressModalProps) => {
	const { toast } = useToast()

	const [newAddress, setNewAddress] = useState<`0x${string}`>('0x')

	const trackedAddresses = useTrackedAddressesStore(
		(state) => state.getTrackedAddresses,
	)
	const addTrackedAddress = useTrackedAddressesStore(
		(state) => state.addTrackedAddress,
	)

	const resetAddressInput = () => setNewAddress('0x')

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
		resetAddressInput()
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild={true}>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Add new address</AlertDialogTitle>
					<AlertDialogDescription asChild={true}>
						<div className="grid grid-cols-1">
							<Input
								value={newAddress}
								onChange={(e) => setNewAddress(e.target.value as `0x${string}`)}
							/>
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={resetAddressInput}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction asChild={true}>
						<Button
							className="flex w-fit"
							disabled={newAddress.length !== 42}
							onClick={() => handleAddTrackedAddress(newAddress)}
						>
							<Plus className="mr-2" />
							Add new address
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default AddNewAddressModal
