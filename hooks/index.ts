import { TransactionResponse } from '@types'
import { Fetcher } from 'swr'

export * from './ui'
export * from './zksync'

export { useIsMounted } from './useIsMounted'

export const defaultFetcher: Fetcher<TransactionResponse> = (...args: any[]) =>
	// @ts-ignore
	fetch(...args).then((res) => res.json())
