import { Address } from 'wagmi'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const initialTrackedInfo = {
	tokens: {
		ETH: 0,
		WETH: 0,
		USDC: 0,
	},
	transactions: {
		transactionCount: 0,
		smartContractInteractionCount: 0,
		lastTransaction: 0,
		bridgedValueInUSD: 0,
		gasFeeCostInUSD: 0,
		transactionVolumeInUSD: 0,
		activeDays: 0,
		activeWeeks: 0,
		activeMonths: 0,
	},
}

type TrackedInfo = {
	tokens: {
		ETH: number
		WETH: number
		USDC: number
	}
	transactions: {
		transactionCount: number
		smartContractInteractionCount: number
		lastTransaction: number
		bridgedValueInUSD: number
		gasFeeCostInUSD: number
		transactionVolumeInUSD: number
		activeDays: number
		activeWeeks: number
		activeMonths: number
	}
}

interface SingleZksyncStore {
	address: Address | null
	trackedInfo: TrackedInfo

	updateTrackedInfo: (trackedInfo: TrackedInfo) => void
	setAddress: (address: Address) => void
	clear: () => void
}

export const useSingleZksyncStore = create<SingleZksyncStore>()(
	devtools(
		persist(
			(set, get) => ({
				address: null,
				trackedInfo: {
					...initialTrackedInfo,
				},
				setAddress: (address: Address) => {
					set(() => ({ address }), false, 'setAddress')
				},
				updateTrackedInfo: (trackedInfo: TrackedInfo) => {
					set(() => ({ trackedInfo }), false, 'updateTrackedInfo')
				},
				clear: () => {
					set(
						() => ({ address: null, trackedInfo: { ...initialTrackedInfo } }),
						false,
						'clearAddress',
					)
				},
			}),
			{
				name: 'single-zksync-store',
				getStorage: () => localStorage,
			},
		),
	),
)
