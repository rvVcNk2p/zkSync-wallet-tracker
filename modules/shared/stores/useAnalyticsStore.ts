import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AnalyticsStore {}

export const useAnalyticsStore = create<AnalyticsStore>()(
	devtools(
		persist(() => ({}), {
			name: 'analytics-store',
			getStorage: () => localStorage,
		}),
	),
)
