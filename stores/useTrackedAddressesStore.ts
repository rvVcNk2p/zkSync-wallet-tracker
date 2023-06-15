import { Address } from 'viem'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface TrackedAddressesStore {
	trackedAddresses: Address[]
	addTrackedAddress: (address: Address) => void
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
						get().trackedAddresses.indexOf(address) === -1
							? [...get().trackedAddresses, address]
							: get().trackedAddresses

					set(
						() => ({
							trackedAddresses,
						}),
						false,
						'addTrackedAddress',
					)
				},
				removeTrackedAddress: (_address: Address) =>
					set(
						(state) => ({
							trackedAddresses: state.trackedAddresses.filter(
								(address) => address !== _address,
							),
						}),
						false,
						'removeTrackedAddress',
					),
				clearTrackedAddresses: () =>
					set({ trackedAddresses: [] }, false, 'clearTrackedAddresses'),
			}),
			{
				name: 'tracked-Aaddresses-store',
				getStorage: () => localStorage,
			},
		),
	),
)
