'use client'

import { ThemeProvider } from 'next-themes'
import { FC } from 'react'

interface ThemeWrapperProps {
	children: React.ReactNode
}

const ThemeWrapper: FC<ThemeWrapperProps> = ({
	children,
}: ThemeWrapperProps) => {
	return (
		<ThemeProvider attribute="class" defaultTheme="light">
			{children}
		</ThemeProvider>
	)
}

export default ThemeWrapper
