'use client'

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { SheetClose } from '@/components/ui/sheet'
import { useIsMounted } from '@/hooks'
import { DefaultSheet } from '@atoms'
import { Hammer, Moon, SunDim } from '@phosphor-icons/react'
import { List } from '@phosphor-icons/react'
import { Chain, useAccountModal, useChainModal } from '@rainbow-me/rainbowkit'
import { Button, Skeleton } from '@ui'
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

const MobileTriggerElement = () => {
	return <List size={24} weight="fill" className="cursor-pointer" />
}

interface NavigationMenuComponentProps {
	isMobile?: boolean
}
const NavigationMenuComponent = ({
	isMobile,
}: NavigationMenuComponentProps) => {
	const listClasses = isMobile
		? 'gap-2 flex flex-col items-center h-screen justify-center'
		: 'flex gap-2'

	return (
		<NavigationMenuList className={listClasses}>
			{navItems.map((item: NavItem) => (
				<NavigationMenuItem key={item.href}>
					<Link href={item.href} legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							{isMobile ? <SheetClose>{item.label}</SheetClose> : item.label}
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			))}
		</NavigationMenuList>
	)
}

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

				<div className="block sm:hidden">
					<DefaultSheet trigger={<MobileTriggerElement />} size="xl">
						<NavigationMenuComponent isMobile={true} />
					</DefaultSheet>
				</div>

				<div className="hidden sm:block">
					<NavigationMenuComponent />
				</div>

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
