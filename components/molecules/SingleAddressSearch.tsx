'use client'

import { Button, Input, Label } from '@modules/shared/components/atoms'
import { useSingleZksyncStore } from '@stores'
import { useState } from 'react'

const SingleAddressSearch = () => {
	const [localAddress, setLocalAddress] = useState('')

	const handleLocalAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalAddress(e.target.value)
	}
	const handleAddressChange = () => setAddres(localAddress as `0x${string}`)

	const setAddres = useSingleZksyncStore((state) => state.setAddress)

	return (
		<>
			<div className="flex flex-col items-center gap-2">
				<Label className="text-xl font-semibold">
					Welcome to zkSync Era Mainnet
				</Label>
				<Label>
					Obtain a detailed overview of your Zksync Era wallet&apos;s
					activities.
				</Label>
				<div className="flex justify-center">
					<div className="flex w-[500px] mt-10">
						<Input
							value={localAddress}
							onChange={handleLocalAddressChange}
							placeholder="0x329C06C335d5fd3f18600e5A05280E911f083038"
							className="rounded-tr-none rounded-br-none"
						/>
						<Button
							className="rounded-tl-none rounded-bl-none"
							disabled={localAddress.length !== 42}
							onClick={() => handleAddressChange()}
						>
							Search
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}

export default SingleAddressSearch
