'use client'

import { Button, Label } from '@modules/shared/components/atoms'
import { ChainIds } from '@modules/shared/constants'
import { useGetOnChainBalances } from '@modules/shared/hooks'
import { useIsMounted } from '@modules/shared/hooks'
import { SingleCard } from '@modules/zksync/components'
import {
	AchievementAccordion,
	ChangeAddressModal,
} from '@modules/zksync/components'
import { useGetTransactionsData } from '@modules/zksync/hooks'
import { useGenerateTasks } from '@modules/zksync/hooks'
import { useSingleZksyncStore } from '@modules/zksync/stores'
import { ArrowsClockwise, CircleNotch } from '@phosphor-icons/react'
import { transformResultArrayToObject, usdFormatter } from '@utils'
import moment from 'moment'
import { useEffect } from 'react'
import { Address } from 'wagmi'

const CardTitle = ({ address }: { address: Address }) => {
	return (
		<div className="flex justify-between items-center px-4 border-b pb-4 flex-wrap gap-4">
			<Label className="text-md">{address}</Label>
			<ChangeAddressModal>
				<Button className="w-fit">
					<ArrowsClockwise className="mr-2" />
					Change address
				</Button>
			</ChangeAddressModal>
		</div>
	)
}

type CardTileProps = {
	data: { title: string; value: string | number }[]
	isLoading?: boolean
}

const CardTile = ({ data, isLoading }: CardTileProps) => {
	return (
		<SingleCard>
			<div
				className="flex flex-col justify-between w-full gap-4"
				style={{ opacity: isLoading ? 0.5 : 1 }}
			>
				{data.map((item) => {
					return (
						<div
							className="flex justify-between border-b pb-4 last:border-none last:pb-0"
							key={item.title}
						>
							<Label className="text-base">{item.title}</Label>
							<div className="flex items-center">
								{isLoading ? (
									<CircleNotch className="mr-2 animate-spin" />
								) : null}
								{item.value}
							</div>
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

	const {
		data: balanceData,
		error: balanceError,
		isLoading: balanceIsLoading,
		isValidating: balanceIsValidating,
	} = useGetOnChainBalances(address, ChainIds.ZK_SYNC_ERA_MAINNET, [
		'ETH',
		'WETH',
		'USDC',
	])

	useEffect(() => {
		if (transactionData) {
			updateTrackedInfo({
				...trackedInfo,
				transactions: {
					...transactionData.data,
					smartContractInteractionCount: 0,
				},
			})
		}
	}, [transactionData])

	useEffect(() => {
		if (balanceData) {
			const transformedBalancesData = transformResultArrayToObject(balanceData)
			updateTrackedInfo({
				...trackedInfo,
				tokens: {
					...trackedInfo.tokens,
					...transformedBalancesData,
				},
			})
		}
	}, [balanceData])

	// Transaction Data Mapping
	const {
		activeDays,
		activeWeeks,
		activeMonths,
		bridgedValueInUSD,
		gasFeeCostInUSD,
		transactionVolumeInUSD,
		transactionCount,
		lastTransaction,
		smartContractInteractionCount,
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
			title: 'Last Transaction',
			value: lastTransaction
				? moment(lastTransaction).startOf('minute').fromNow()
				: '-',
		},
		{
			title: 'Transaction Count',
			value: transactionCount,
		},
		{
			title: 'Contract Interaction',
			value: '🚧', //smartContractInteractionCount,
		},
	]

	// Balance Data Mapping
	const { ETH, WETH, USDC } = trackedInfo.tokens

	const tokensData = [
		{
			title: 'ETH',
			value: ETH,
		},
		{
			title: 'WETH',
			value: WETH,
		},
		{
			title: 'USDC',
			value: USDC,
		},
	]

	const transactionIsLoadingOrValidating =
		transactionIsLoading || transactionIsValidating
	const balanceIsLoadingOrValidating = balanceIsLoading || balanceIsValidating

	const tasks = useGenerateTasks()

	return (
		<>
			{address ? (
				<div className="flex flex-col items-end gap-6">
					<h1 className="text-xl text-center w-full mb-6">
						zkSync Era Mainnet
					</h1>

					{isMounted ? (
						<>
							<SingleCard title={<CardTitle address={address} />}>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<CardTile
										data={usdRelatedData}
										isLoading={transactionIsLoadingOrValidating}
									/>
									<CardTile
										data={transactionActivityData}
										isLoading={transactionIsLoadingOrValidating}
									/>
									<CardTile
										data={tokensData}
										isLoading={balanceIsLoadingOrValidating}
									/>
									<CardTile
										data={timeRelatedData}
										isLoading={transactionIsLoadingOrValidating}
									/>
								</div>
							</SingleCard>
							<Label className="text-xs italic">
								*Refreshing occurs automatically; there is no need to click on a
								&apos;Refresh&apos; button.
							</Label>
							{/* Achivement section */}
							<div className="w-full flex flex-col justify-center items-center gap-20 mt-20 mb-10">
								<h1 className="text-3xl underline">
									zkSync Airdrop Eligibility Guide
								</h1>
								<AchievementAccordion tasks={tasks} />
							</div>
						</>
					) : null}
				</div>
			) : null}
		</>
	)
}

export default SingleZksyncContent
