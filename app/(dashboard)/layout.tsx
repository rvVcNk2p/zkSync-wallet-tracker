import WalletAuthenticationWrapper from '@/components/organisms/wrappers/WalletAuthenticationWrapper'
import { Header, PageLayout } from '@ui'
import { FC } from 'react'

interface DashboardLayoutProps {
	children: React.ReactNode
}

const DashboardLayout: FC<DashboardLayoutProps> = ({
	children,
}: DashboardLayoutProps) => {
	return (
		<WalletAuthenticationWrapper>
			<Header />
			<PageLayout>{children}</PageLayout>
		</WalletAuthenticationWrapper>
	)
}

export default DashboardLayout
