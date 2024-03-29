'use client'

import { useIsMounted } from '@modules/shared/hooks'
import { redirect } from 'next/navigation'
import { useAccount } from 'wagmi'

export interface WalletAuthenticationWrapperProps {
	children: React.ReactNode
}

const WalletAuthenticationWrapper = (
	props: WalletAuthenticationWrapperProps,
) => {
	const isMounted = useIsMounted()
	const { isConnected } = useAccount()

	if (!isMounted) return null

	if (!isConnected) redirect('/login')

	return <>{props.children}</>
}

export default WalletAuthenticationWrapper
