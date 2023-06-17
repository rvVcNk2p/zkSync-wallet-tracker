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
import { useSingleZksyncStore } from '@stores'
import { Button, Input } from '@ui'
import { useState } from 'react'

interface AddNewAddressModalProps {
	children: React.ReactNode
}

const ChangeAddressModal = ({ children }: AddNewAddressModalProps) => {
	const { toast } = useToast()

	const [newAddress, setNewAddress] = useState<`0x${string}`>('0x')

	const changeAddress = useSingleZksyncStore((state) => state.setAddress)
	const address = useSingleZksyncStore((state) => state.address)

	const resetAddressInput = () => setNewAddress('0x')

	const handleAddTrackedAddress = (newAddress: `0x${string}`) => {
		if (address === newAddress) {
			toast({
				title: '❌ Old address error!',
				description: 'Nothing changed. Please enter a new address.',
				duration: 5000,
				variant: 'destructive',
			})

			resetAddressInput()
			return
		}

		changeAddress(newAddress)

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
							Change address
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default ChangeAddressModal
