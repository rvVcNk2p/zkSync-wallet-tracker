import { PageLayout } from '@modules/shared/components/layouts'
import { Header } from '@modules/shared/components/nav'
import { WalletAuthenticationWrapper } from '@modules/shared/components/wrappers'
import { FC } from 'react'

interface DashboardLayoutProps {
	children: React.ReactNode
}

const DashboardLayout: FC<DashboardLayoutProps> = ({
	children,
}: DashboardLayoutProps) => {
	return (
		// <WalletAuthenticationWrapper>
		<>
			<Header />
			<PageLayout>{children}</PageLayout>
		</>
		// </WalletAuthenticationWrapper>
	)
}

export default DashboardLayout
