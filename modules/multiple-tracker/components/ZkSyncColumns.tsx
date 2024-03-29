'use client'

import { ColumnDef } from '@tanstack/react-table'
import { shortenerAddress, usdFormatter } from '@utils'
import moment from 'moment'
import Link from 'next/link'

import { TrashActionIcon } from './TrashIcon'

export const columns: ColumnDef<{ [key: string]: string }>[] = [
	{
		accessorKey: 'address',
		header: () => <div className="text-center">Address</div>,
		cell: ({ row }) => {
			const address = row.getValue('address') as string

			return <div className="text-center">{shortenerAddress(address)}</div>
		},
	},
	{
		accessorKey: 'ETH',
		header: 'ETH',
	},
	{
		accessorKey: 'WETH',
		header: 'WETH',
	},
	{
		accessorKey: 'USDC',
		header: 'USDC',
	},
	{
		accessorKey: 'transactionVolumeInUSD',
		header: () => <div className="text-center">Tx Volume</div>,
		cell: ({ row }) => {
			const amount = row.getValue('transactionVolumeInUSD') as number
			const formatted = usdFormatter(amount)

			return <div className="text-center">{formatted}</div>
		},
	},
	{
		accessorKey: 'gasFeeCostInUSD',
		header: () => <div className="text-center">Gas Cost</div>,
		cell: ({ row }) => {
			const amount = row.getValue('gasFeeCostInUSD') as number
			const formatted = usdFormatter(amount)

			return <div className="text-center">{formatted}</div>
		},
	},
	{
		accessorKey: 'bridgedValueInUSD',
		header: () => (
			<div className="text-center">
				<Link
					href="https://bridge.zksync.io/"
					target="_blank"
					className="underline"
				>
					Bridged Value
				</Link>
			</div>
		),
		cell: ({ row }) => {
			const amount = row.getValue('bridgedValueInUSD') as number
			const formatted = usdFormatter(amount)

			return <div className="text-center">{formatted}</div>
		},
	},
	{
		accessorKey: 'transactionCount',
		header: () => <div className="text-center">Tx Count</div>,
		cell: ({ row }) => {
			const transactionCount = row.getValue('transactionCount') as number

			return <div className="text-center">{transactionCount}</div>
		},
	},
	{
		accessorKey: 'lastTransaction',
		header: () => <div className="text-center">Last Tx</div>,
		cell: ({ row }) => {
			const lastTransaction = row.getValue('lastTransaction') as string

			return (
				<div className="text-center">
					{lastTransaction
						? moment(lastTransaction).startOf('minute').fromNow()
						: '-'}
				</div>
			)
		},
	},
	{
		accessorKey: 'activeDays',
		header: () => <div className="text-center">Active Days</div>,
		cell: ({ row }) => {
			const activeDays = row.getValue('activeDays') as string

			return <div className="text-center">{activeDays}</div>
		},
	},
	{
		accessorKey: 'activeWeeks',
		header: () => <div className="text-center">Active Weeks</div>,
		cell: ({ row }) => {
			const activeDays = row.getValue('activeWeeks') as string

			return <div className="text-center">{activeDays}</div>
		},
	},
	{
		accessorKey: 'activeMonths',
		header: () => <div className="text-center">Active Months</div>,
		cell: ({ row }) => {
			const activeDays = row.getValue('activeMonths') as string

			return <div className="text-center">{activeDays}</div>
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const address = row.getValue('address') as `0x${string}`
			return <TrashActionIcon address={address} />
		},
	},
]
