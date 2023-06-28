'use client'

import { useToast } from '@hooks'
import { Button, Input } from '@modules/shared/components/atoms'
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
} from '@modules/shared/components/atoms/alert-dialog'
import { Plus } from '@phosphor-icons/react'
import { useTrackedAddressesStore } from '@stores'
import { useState } from 'react'

interface AddNewAddressModalProps {
	children: React.ReactNode
}

const AddNewAddressModal = ({ children }: AddNewAddressModalProps) => {
	const { toast } = useToast()

	// @ts-ignore
	const [newAddress, setNewAddress] = useState<`0x${string}`>('')

	const trackedAddresses = useTrackedAddressesStore(
		(state) => state.getTrackedAddresses,
	)
	const addTrackedAddress = useTrackedAddressesStore(
		(state) => state.addTrackedAddress,
	)

	// @ts-ignore
	const resetAddressInput = () => setNewAddress('')

	const handleAddTrackedAddress = (newAddress: `0x${string}`) => {
		if (trackedAddresses().includes(newAddress)) {
			toast({
				title: 'Duplicated address error!',
				description: 'Address already tracked.',
				duration: 5000,
				variant: 'destructive',
			})
			resetAddressInput()
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
					<AlertDialogTitle>Enter the new address:</AlertDialogTitle>
					<AlertDialogDescription asChild={true}>
						<div className="grid grid-cols-1">
							<Input
								value={newAddress}
								placeholder="0x329C06C335d5fd3f18600e5A05280E911f083038"
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
							className="flex w-full sm:w-fit"
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
