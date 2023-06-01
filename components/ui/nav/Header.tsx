'use client'

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Moon, SunDim } from '@phosphor-icons/react'
import { Button } from '@ui'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'

type NavItem = {
	href: string
	label: string
}
const navItems: NavItem[] = [
	{ href: '/', label: 'Home' },
	{ href: '/explore', label: 'Explore' },
	{ href: '/communities', label: 'Communities' },
	{ href: '/questercamp', label: 'QuesterCamp' },
]

const Header = (): JSX.Element => {
	const [popoverStatus, setPopoverStatus] = useState(false)

	return (
		<>
			<NavigationMenu className="mt-4 gap-2">
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

				<Popover open={popoverStatus}>
					<PopoverTrigger asChild>
						<Button
							variant="pushable"
							onMouseEnter={() => setPopoverStatus(true)}
						>
							Pushable
						</Button>
					</PopoverTrigger>
					<PopoverContent
						side="bottom"
						onMouseLeave={() => setPopoverStatus(false)}
						onPointerDownOutside={() => setPopoverStatus(false)}
						sideOffset={10}
					>
						Place content for the popover here.
					</PopoverContent>
				</Popover>
				<ThemeToggleButton />
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

	return (
		<button
			onClick={() => (theme == 'dark' ? setTheme('light') : setTheme('dark'))}
			className="bg-gray-800 dark:bg-gray-50 hover:bg-gray-600 dark:hover:bg-gray-300 transition-all duration-100 text-white dark:text-gray-800 py-1 px-3 rounded-lg"
		>
			{theme === 'dark' ? <SunDim /> : <Moon />}
		</button>
	)
}

export default Header
