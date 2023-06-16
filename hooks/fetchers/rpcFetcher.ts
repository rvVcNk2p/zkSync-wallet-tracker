export const rpcFetcher = <T>(...args: any[]): Promise<T> =>
	// @ts-ignore
	fetch(...args).then((res) => res.json()) as Promise<T>
