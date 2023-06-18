import type { RawTask, TaskDescriptor } from '@types'
import { useSingleZksyncStore } from 'stores'

const bridgeTask = (bridgedValueInUSD: number) => {
	return {
		title: 'Bridged to zkSync',
		description: 'Bridget to VARIANT_1',
		variants: [
			{
				isCompleted: bridgedValueInUSD > 0,
				variables: {
					VARIANT_1: 'zkSync Era Mainnet',
				},
			},
			{
				isCompleted: false,
				variables: {
					VARIANT_1: 'zkSync Era Testnet',
				},
			},
		],
	}
}

const transactionOverTimeTask = (activeMonths: number) => {
	return {
		title: 'Transaction over time',
		description:
			'You’ve conducted transactions during VARIANT_1 distinct months',
		variants: [
			{
				isCompleted: activeMonths >= 1,
				variables: {
					VARIANT_1: '1',
				},
			},
			{
				isCompleted: activeMonths >= 6,
				variables: {
					VARIANT_1: '6',
				},
			},
			{
				isCompleted: activeMonths >= 9,
				variables: {
					VARIANT_1: '9',
				},
			},
		],
	}
}

const transactionFrequencyAndInteractionTask = (
	transactionCount: number,
	smartContractInteractionCount: number,
) => {
	return {
		title: 'Transaction Frequency And Interaction',
		description:
			'You’ve conducted more than VARIANT_1 transactions OR interacted with more than VARIANT_2 smart contracts',
		variants: [
			{
				isCompleted:
					transactionCount >= 4 || smartContractInteractionCount >= 4,
				variables: {
					VARIANT_1: '4',
					VARIANT_2: '4',
				},
			},
			{
				isCompleted:
					transactionCount >= 10 || smartContractInteractionCount >= 10,
				variables: {
					VARIANT_1: '10',
					VARIANT_2: '10',
				},
			},
			{
				isCompleted:
					transactionCount >= 25 || smartContractInteractionCount >= 25,
				variables: {
					VARIANT_1: '25',
					VARIANT_2: '25',
				},
			},
			{
				isCompleted:
					transactionCount >= 100 || smartContractInteractionCount >= 100,
				variables: {
					VARIANT_1: '100',
					VARIANT_2: '100',
				},
			},
		],
	}
}

const transactionValueTask = (transactionVolumeInUSD: number) => {
	return {
		title: 'Transaction Value',
		description:
			'You’ve conducted transactions with more than VARIANT_1 in aggregate value',
		variants: [
			{
				isCompleted: transactionVolumeInUSD > 500,
				variables: {
					VARIANT_1: '$500',
				},
			},
			{
				isCompleted: transactionVolumeInUSD > 1000,
				variables: {
					VARIANT_1: '$1,000',
				},
			},
			{
				isCompleted: transactionVolumeInUSD > 10000,
				variables: {
					VARIANT_1: '$10,000',
				},
			},
			{
				isCompleted: transactionVolumeInUSD > 50000,
				variables: {
					VARIANT_1: '$50,000',
				},
			},
			{
				isCompleted: transactionVolumeInUSD > 250000,
				variables: {
					VARIANT_1: '$250,000',
				},
			},
		],
	}
}

const assetsBridgedToZksyncMainnet = (bridgedValueInUSD: number) => {
	return {
		title: 'Assets Bridged To zkSync Era Mainnet',
		description: 'You’ve deposited more than VARIANT_1 of assets',
		variants: [
			{
				isCompleted: bridgedValueInUSD > 500,
				variables: {
					VARIANT_1: '$500',
				},
			},
			{
				isCompleted: bridgedValueInUSD > 1000,
				variables: {
					VARIANT_1: '$1,000',
				},
			},
			{
				isCompleted: bridgedValueInUSD > 10000,
				variables: {
					VARIANT_1: '$10,000',
				},
			},
			{
				isCompleted: bridgedValueInUSD > 50000,
				variables: {
					VARIANT_1: '$50,000',
				},
			},
			{
				isCompleted: bridgedValueInUSD > 250000,
				variables: {
					VARIANT_1: '$250,000',
				},
			},
		],
	}
}

const generateTasks = (rawTasks: RawTask[]): TaskDescriptor[] => {
	return rawTasks.map((rawTask) => ({
		title: rawTask.title,
		variants: rawTask.variants.map((variant) => {
			return {
				isCompleted: variant.isCompleted,
				description: Object.entries(variant.variables).reduce(
					(acc, [key, value]) => {
						return acc.replaceAll(key, value)
					},
					rawTask.description,
				),
			}
		}),
	}))
}

export const useGenerateTasks = () => {
	const trackedInfo = useSingleZksyncStore((state) => state.trackedInfo)

	const {
		transactionCount,
		smartContractInteractionCount,
		bridgedValueInUSD,
		transactionVolumeInUSD,
		activeMonths,
	} = trackedInfo.transactions

	const rawTasks: RawTask[] = [
		bridgeTask(bridgedValueInUSD),
		transactionOverTimeTask(activeMonths),
		transactionFrequencyAndInteractionTask(
			transactionCount,
			smartContractInteractionCount,
		),
		transactionValueTask(transactionVolumeInUSD),
		assetsBridgedToZksyncMainnet(bridgedValueInUSD),
	]

	const tasks: TaskDescriptor[] = generateTasks(rawTasks)

	return tasks
}
