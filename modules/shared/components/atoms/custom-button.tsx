'use client'

import { Slot } from '@radix-ui/react-slot'
import { cn } from '@utils'
import { VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

// TODO: Use the primary colore instead of black
const buttonVariants = cva(
	[
		'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all',
		'relative top-[-4px] left-[-4px] hover:top-0 hover:left-0 z-10 min-w-max',
		'focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 ring-offset-background',
		'disabled:opacity-50 disabled:pointer-events-none',
	],
	{
		variants: {
			variant: {
				default:
					'bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white',
				destructive: [
					'bg-destructive text-destructive-foreground hover:bg-destructive',
				],
				outline:
					'bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white',
				social: [
					'bg-black text-white border-2 border-black',
					'dark:bg-white dark:text-black dark:border-white',
					'hover:!bg-destructive hover:!text-destructive-foreground hover:!border-destructive',
				],
			},
			size: {
				equal: 'p-2',
				default: 'h-10 py-2 px-4',
				sm: 'h-9 px-3 rounded-md',
				lg: 'h-11 px-8 rounded-md',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)
const buttonBackdropVariants = cva(
	[
		'absolute h-full w-full bg-black dark:bg-white border-2 border-black rounded-md top-0 left-0',
	],
	{
		variants: {
			variant: {
				default: 'dark:border-white',
				destructive: 'bg-white dark:bg-transparent dark:border-white',
				outline: 'bg-white dark:bg-transparent dark:border-white',
				social: 'bg-white dark:bg-transparent dark:border-white',
			},
		},
	},
)
export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const CutomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'

		return (
			<div className="relative box-border">
				<Comp
					className={cn(buttonVariants({ variant, size, className }))}
					ref={ref}
					{...props}
				/>
				<span className={cn(buttonBackdropVariants({ variant }))} />
			</div>
		)
	},
)
CutomButton.displayName = 'CutomButton'

export { CutomButton, buttonVariants }
