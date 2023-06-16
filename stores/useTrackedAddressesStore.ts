import { Address } from 'viem'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const generateFallbackData = (address: `0x${string}`) => {
	return {
		address,
		ETH: 0,
		WETH: 0,
		USDC: 0,
		// bridgedValueInUSD: 0,
		transactionCount: 0,
		lastTransaction: 0,
		activeDays: 0,
		activeWeeks: 0,
		activeMonths: 0,
		gasFeeCostInUSD: 0,
		transactionVolumeInUSD: 0,
	}
}

interface TrackedAddressesStore {
	trackedAddresses: any[]
	getTrackedAddresses: () => `0x${string}`[]
	addTrackedAddress: (address: Address) => void
	updateTrackedAddress: (trackedAddresses: any[]) => void
	removeTrackedAddress: (address: Address) => void
	clearTrackedAddresses: () => void
}

export const useTrackedAddressesStore = create<TrackedAddressesStore>()(
	devtools(
		persist(
			(set, get) => ({
				trackedAddresses: [],
				addTrackedAddress: (address: Address) => {
					const trackedAddresses =
						get().trackedAddresses.findIndex(
							(trackedAddress) => trackedAddress.address === address,
						) === -1
							? [...get().trackedAddresses, generateFallbackData(address)]
							: get().trackedAddresses

					set(
						() => ({
							trackedAddresses,
						}),
						false,
						'addTrackedAddress',
					)
				},
				getTrackedAddresses: () => {
					return get().trackedAddresses.map((trackedAddress) => {
						return trackedAddress.address
					})
				},
				removeTrackedAddress: (_address: Address) =>
					set(
						(state) => ({
							trackedAddresses: state.trackedAddresses.filter(
								(trackedAddress) => trackedAddress.address !== _address,
							),
						}),
						false,
						'removeTrackedAddress',
					),
				updateTrackedAddress: (trackedAddresses: any[]) =>
					set(
						() => ({
							trackedAddresses,
						}),
						false,
						'updateTrackedAddress',
					),
				clearTrackedAddresses: () =>
					set({ trackedAddresses: [] }, false, 'clearTrackedAddresses'),
			}),
			{
				name: 'tracked-addresses-store',
				getStorage: () => localStorage,
			},
		),
	),
)
