import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface TrackedAddressesStore {
	trackedAddresses: string[]
	addTrackedAddress: (address: string) => void
	removeTrackedAddress: (address: string) => void
	clearTrackedAddresses: () => void
}

export const useTrackedAddressesStore = create<TrackedAddressesStore>()(
	devtools(
		persist(
			(set, get) => ({
				trackedAddresses: [],
				addTrackedAddress: (address: string) => {
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
				removeTrackedAddress: (_address: string) =>
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
