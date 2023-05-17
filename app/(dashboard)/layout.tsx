import WalletAuthenticationWrapper from '@/components/organisms/wrappers/WalletAuthenticationWrapper'
import { FC } from 'react'

interface DashboardLayoutProps {
	children: React.ReactNode
}

const DashboardLayout: FC<DashboardLayoutProps> = ({
	children,
}: DashboardLayoutProps) => {
	return (
		<WalletAuthenticationWrapper>
			{/* HEADER */}
			{children}
		</WalletAuthenticationWrapper>
	)
}

export default DashboardLayout
