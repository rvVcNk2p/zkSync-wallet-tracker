import { zkSync } from 'viem/chains'

export interface ChainIdMap {
	[key: string]: number
}

export const ChainIds: ChainIdMap = {
	ZK_SYNC_ERA_MAINNET: zkSync.id,
}
