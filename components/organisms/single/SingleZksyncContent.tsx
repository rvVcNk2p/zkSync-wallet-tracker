'use client'

import { useIsMounted } from '@hooks'
import { useGetOnChainBalances, useGetTransactionsData } from '@hooks'
import { SingleCard } from '@molecules'
import { Label } from '@ui'
import { usdFormatter } from '@utils'
import moment from 'moment'
import { useEffect } from 'react'
import { useSingleZksyncStore } from 'stores'
import { Address } from 'wagmi'

const cardTitle = ({ address }: { address: Address }) => {
	return (
		<div className="flex justify-between px-4 border-b pb-4">
			<Label className="text-md">{address}</Label>
			<div>Search comes here..</div>
		</div>
	)
}

type CardTileProps = {
	data: { title: string; value: string | number }[]
}

const CardTile = ({ data }: CardTileProps) => {
	return (
		<SingleCard>
			<div className="flex flex-col justify-between w-full gap-4">
				{data.map((item) => {
					return (
						<div
							className="flex justify-between border-b pb-4 last:border-none last:pb-0"
							key={item.title}
						>
							<Label className="text-base">{item.title}</Label>
							<div>{item.value}</div>
						</div>
					)
				})}
			</div>
		</SingleCard>
	)
}

const SingleZksyncContent = () => {
	const isMounted = useIsMounted()
	const address = useSingleZksyncStore((state) => state.address)
	const trackedInfo = useSingleZksyncStore((state) => state.trackedInfo)

	const updateTrackedInfo = useSingleZksyncStore(
		(state) => state.updateTrackedInfo,
	)

	const {
		data: transactionData,
		error: transactionError,
		isLoading: transactionIsLoading,
		isValidating: transactionIsValidating,
	} = useGetTransactionsData(address)

	useEffect(() => {
		if (transactionData) {
			console.log('transactionData', transactionData)
			updateTrackedInfo({
				...trackedInfo,
				transactions: {
					...transactionData.data,
					bridgedValueInUSD: 0,
				},
			})
		}
	}, [transactionData])

	const {
		activeDays,
		activeWeeks,
		activeMonths,
		bridgedValueInUSD,
		gasFeeCostInUSD,
		transactionVolumeInUSD,
		transactionCount,
		lastTransaction,
	} = trackedInfo.transactions

	const timeRelatedData = [
		{
			title: 'Active Day(s)',
			value: activeDays,
		},
		{
			title: 'Active Weeks(s)',
			value: activeWeeks,
		},
		{
			title: 'Active Months(s)',
			value: activeMonths,
		},
	]

	const usdRelatedData = [
		{
			title: 'Bridged Value (USD)',
			value: usdFormatter(bridgedValueInUSD),
		},
		{
			title: 'Gas Cost (USD)',
			value: usdFormatter(gasFeeCostInUSD),
		},
		{
			title: 'Transaction Volume (USD)',
			value: usdFormatter(transactionVolumeInUSD),
		},
	]

	const transactionActivityData = [
		{
			title: 'Transaction Count',
			value: transactionCount,
		},
		{
			title: 'Last Transaction',
			value: lastTransaction
				? moment(lastTransaction).startOf('minute').fromNow()
				: '-',
		},
	]

	return (
		<>
			{address ? (
				<div className="flex flex-col items-center gap-6">
					<h1 className="text-xl">zkSync Era Mainnet</h1>
					{isMounted ? (
						<>
							<SingleCard title={cardTitle({ address })}>
								<div className="flex flex-col gap-4">
									<CardTile data={usdRelatedData} />
									<CardTile data={transactionActivityData} />
									<CardTile data={timeRelatedData} />
								</div>
							</SingleCard>
						</>
					) : null}
				</div>
			) : null}
		</>
	)
}

export default SingleZksyncContent
