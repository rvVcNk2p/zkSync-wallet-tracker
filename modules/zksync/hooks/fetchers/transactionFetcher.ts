import { defaultFetcher } from '@modules/shared/hooks/fetchers'
import type { TransactionResponse } from '@types'
import type { Transaction } from '@types'
import { generateLimitAndOffsetArray, hexToBn } from '@utils'
import moment from 'moment'
import { formatUnits } from 'viem'

const calculateActivity = (transactions: Transaction[] = []) => {
	const activeDays: Set<string> = new Set<string>()
	let feeCost: bigint = BigInt(0)
	let transactionVolumeInUSD: number = 0
	let ethUSDPrice: number = 0
	let bridgedValueInUSD: number = 0

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
				type,
			} = balanceChange as any

			// Bridged value calculation in USD
			if (type === 'deposit') {
				bridgedValueInUSD += (parseInt(amount, 16) / 10 ** decimals) * usdPrice
			}

			if (type !== 'deposit') {
				const transactionValue =
					(parseInt(amount, 16) / 10 ** decimals) * usdPrice
				transactionVolumeInUSD += transactionValue
			}
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
		bridgedValueInUSD: bridgedValueInUSD.toFixed(2),
	}
}

type TransactionFetcheProps = {
	address: `0x${string}`
}

const LIMIT_SIZE = 100

const TRANSACTIONS_URL = `https://zksync2-mainnet-explorer.zksync.io/transactions?direction=older&accountAddress=`

// TODO: Handle fallback data
export const transactionFetcher = async ({
	address,
}: TransactionFetcheProps): Promise<any> => {
	const url = TRANSACTIONS_URL + address + `&limit=${LIMIT_SIZE}`
	const data = await defaultFetcher<TransactionResponse>(url)

	// If there is more than LIMIT_SIZE transactions, we need to fetch the remaining transactions
	const remainingTransactionsUrl = generateLimitAndOffsetArray(
		LIMIT_SIZE,
		data.total,
	).map(({ limit, offset }) => {
		return `${TRANSACTIONS_URL}${address}&limit=${limit}&offset=${offset}`
	})

	const remainingTransactions = await Promise.all(
		remainingTransactionsUrl.map((url) =>
			defaultFetcher<TransactionResponse>(url),
		),
	)

	let transactionsLis = [
		...data.list,
		...remainingTransactions.reduce(
			(acc: Transaction[], nextList: TransactionResponse) => {
				return [...acc, ...nextList.list]
			},
			[],
		),
	]

	const {
		activeDays,
		activeWeeks,
		activeMonths,
		gasFeeCostInUSD,
		transactionVolumeInUSD,
		bridgedValueInUSD,
	} = calculateActivity(transactionsLis)

	const lastTransactionWithNonce = transactionsLis?.find(
		(t) => t.nonce !== null,
	)

	const transactionCount = lastTransactionWithNonce
		? lastTransactionWithNonce.nonce + 1
		: 0

	const transactionsData = {
		address,
		data: {
			transactionCount,
			lastTransaction: data?.list[0].receivedAt,
			activeDays,
			activeWeeks,
			activeMonths,
			gasFeeCostInUSD,
			transactionVolumeInUSD,
			bridgedValueInUSD,
		},
	}

	return transactionsData
}
