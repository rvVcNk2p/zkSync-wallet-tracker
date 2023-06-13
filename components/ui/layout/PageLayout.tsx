import { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const PageLayout = ({ children }: Props): JSX.Element => {
	// Narrow constrained with padded content
	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-5xl">{children}</div>
		</div>
	)
}

export default PageLayout
