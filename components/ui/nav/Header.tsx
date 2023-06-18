'use client'

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { useIsMounted } from '@/hooks'
import { Hammer, Moon, SunDim } from '@phosphor-icons/react'
import { Chain, useAccountModal, useChainModal } from '@rainbow-me/rainbowkit'
import { Button } from '@ui'
import { Skeleton } from '@ui'
import { cn, shortenerAddress } from '@utils'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useAccount, useNetwork } from 'wagmi'

type NavItem = {
	href: string
	label: string
}
const navItems: NavItem[] = [
	{ href: '/multiple-tracker', label: 'Multiple Tracker' },
	{ href: '/zksync', label: 'zkSync' },
	// { href: '/forge', label: 'Forge' },
]

const Header = (): JSX.Element => {
	const { openAccountModal } = useAccountModal()
	const { openChainModal } = useChainModal()

	const { address } = useAccount()
	const { chain } = useNetwork()

	const isMounted = useIsMounted()

	return (
		<>
			<NavigationMenu className="flex justify-between py-4 px-8 mb-2 gap-20 border-b">
				<Hammer size={48} weight="fill" className="min-w-fit" />

				<NavigationMenuList className="gap-2">
					{navItems.map((item: NavItem) => (
						<NavigationMenuItem key={item.href}>
							<Link href={item.href} legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									{item.label}
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					))}
				</NavigationMenuList>

				<div className="flex gap-2">
					<ThemeToggleButton />
					{address && isMounted ? (
						<>
							<Button className="p-2" onClick={openChainModal}>
								<Image
									src={(chain as Chain)?.iconUrl as string}
									width={28}
									height={28}
									className="border-2 rounded-full border-primary dark:border-secondary"
									alt="Picture of the active chain"
								/>
							</Button>
							<Button
								onClick={openAccountModal}
								className="min-h-full text-base"
							>
								{address && shortenerAddress(address)}
							</Button>
						</>
					) : null}
				</div>
			</NavigationMenu>
		</>
	)
}

const ListItem = React.forwardRef<
	React.ElementRef<'a'>,
	React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	)
})
ListItem.displayName = 'ListItem'

const ThemeToggleButton = () => {
	const { theme, setTheme } = useTheme()
	const isMounted = useIsMounted()

	return (
		<Button
			className="min-h-full p-2"
			onClick={() => (theme == 'dark' ? setTheme('light') : setTheme('dark'))}
		>
			{isMounted ? (
				theme === 'dark' ? (
					<SunDim size={20} />
				) : (
					<Moon size={20} weight="fill" />
				)
			) : (
				<Skeleton className="w-[20px] h-[20px] rounded-full" />
			)}
		</Button>
	)
}

export default Header
