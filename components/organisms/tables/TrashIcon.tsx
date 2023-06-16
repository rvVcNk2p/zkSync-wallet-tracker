import { useTrackedAddressesStore } from '@/stores'
import { useToast } from '@hooks'
import { Trash } from '@phosphor-icons/react'

type TrashActionIconProps = {
	address: `0x${string}`
}

export const TrashActionIcon = ({ address }: TrashActionIconProps) => {
	const removeTrackedAddress = useTrackedAddressesStore(
		(state) => state.removeTrackedAddress,
	)
	const { toast } = useToast()
	const handleRemoveTrackedAddress = (address: `0x${string}`) => {
		removeTrackedAddress(address)
		toast({
			title: '✅ Address removed!',
			description: address,
			duration: 5000,
		})
	}

	return (
		<Trash
			className="cursor-pointer"
			size={20}
			onClick={() => handleRemoveTrackedAddress(address)}
		/>
	)
}
