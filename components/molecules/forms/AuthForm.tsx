'use client'

import { useIsMounted } from '@hooks'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { redirect } from 'next/navigation'
import { FC } from 'react'
import { useAccount } from 'wagmi'

interface UserAuthFormProps {}

const UserAuthForm: FC<UserAuthFormProps> = ({}: UserAuthFormProps) => {
	const isMounted = useIsMounted()

	const { isConnected } = useAccount()

	if (!isMounted) return null

	if (isConnected) redirect('/')

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="flex flex-col space-y-2 text-center">
				<h1 className="text-2xl font-semibold tracking-tight">
					Forge Token Dashboard
				</h1>
				<p className="text-sm text-muted-foreground !mb-4">
					Connect you wallet to get access
				</p>
			</div>
			<ConnectButton />
		</div>
	)
}

export default UserAuthForm
