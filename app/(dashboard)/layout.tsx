import WalletAuthenticationWrapper from '@/components/organisms/wrappers/WalletAuthenticationWrapper'
import { PageLayout } from '@ui'
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
			<PageLayout>{children}z</PageLayout>
		</WalletAuthenticationWrapper>
	)
}

export default DashboardLayout
