export * from './ui'
export * from './zksync'

export { useIsMounted } from './useIsMounted'

export const defaultFetcher = <T>(...args: any[]): Promise<T> =>
	// @ts-ignore
	fetch(...args).then((res) => res.json()) as Promise<T>

export const rpcFetcher = <T>(...args: any[]): Promise<T> =>
	// @ts-ignore
	fetch(...args).then((res) => res.json()) as Promise<T>
