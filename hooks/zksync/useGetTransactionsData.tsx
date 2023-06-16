import { defaultFetcher } from '@fetchers'
import type { TransactionResponse } from '@types'
import type { Transaction } from '@types'
import { hexToBn } from '@utils'
import moment from 'moment'
import useSWR from 'swr'
import { formatUnits } from 'viem'
import { Address } from 'wagmi'

const calculateActivity = (transactions: Transaction[] = []) => {
	const activeDays: Set<string> = new Set<string>()
	let feeCost: bigint = BigInt(0)
	let transactionVolumeInUSD: number = 0
	let ethUSDPrice: number = 0

	transactions.forEach((transaction: Transaction) => {
		activeDays.add(moment(transaction.receivedAt).format('YYYY-MM-DD'))
		feeCost += hexToBn(transaction.fee)

		// Set ETH price in USD
		if (ethUSDPrice === 0 && transaction.balanceChanges.length > 0) {
			ethUSDPrice = parseInt(transaction.balanceChanges[0].tokenInfo.usdPrice)
		}

		// Volume calculation in USD
		for (const balanceChange of transaction.balanceChanges) {
			const {
				tokenInfo: { decimals, usdPrice },
				amount,
				// from,
				// type,
			} = balanceChange as any
			// from === transaction.initiatorAddress && type === 'transfer'

			const transactionValue =
				(parseInt(amount, 16) / 10 ** decimals) * usdPrice

			transactionVolumeInUSD += transactionValue
		}
	})

	const activeWeeks: Record<string, number> = Array.from(activeDays).reduce(
		(acc: any, day: string) => {
			const week = moment(day).format('YYYY-ww')
			if (!acc[week]) {
				acc[week] = 1
			} else {
				acc[week] += 1
			}
			return acc
		},
		{},
	)

	const ativeMonths: Record<string, number> = Array.from(activeDays).reduce(
		(acc: any, day: string) => {
			const month = moment(day).format('YYYY-MM')
			if (!acc[month]) {
				acc[month] = 1
			} else {
				acc[month] += 1
			}
			return acc
		},
		{},
	)

	const gasFeeCostInUSD = (
		(formatUnits(feeCost, 18) as unknown as number) * ethUSDPrice
	).toFixed(2)

	return {
		activeDays: activeDays.size,
		activeWeeks: Object.keys(activeWeeks).length,
		activeMonths: Object.keys(ativeMonths).length,
		gasFeeCostInUSD,
		transactionVolumeInUSD: transactionVolumeInUSD.toFixed(2),
	}
}

const TRANSACTIONS_URL =
	'https://zksync2-mainnet-explorer.zksync.io/transactions?limit=100&direction=older&accountAddress='

export const useGetTransactionsData = (address: Address) => {
	const { data, error, isLoading, isValidating } = useSWR(
		address ? TRANSACTIONS_URL + address : null,
		defaultFetcher<TransactionResponse>,
	)

	const {
		activeDays,
		activeWeeks,
		activeMonths,
		gasFeeCostInUSD,
		transactionVolumeInUSD,
	} = calculateActivity(data?.list)

	const transactionCount = data?.list[0]?.nonce ? data?.list[0]?.nonce + 1 : 0

	const transactionsData = {
		transactionCount,
		lastTransaction: data?.list[0].receivedAt,
		activeDays,
		activeWeeks,
		activeMonths,
		gasFeeCostInUSD,
		transactionVolumeInUSD,
	}

	return {
		transactionsData,
		error,
		isLoading,
		isValidating,
	}
}
