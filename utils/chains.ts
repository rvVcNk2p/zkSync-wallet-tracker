import { Chain } from 'viem'

export interface ChainIdMap {
	[key: string]: Chain
}

export enum ChainIds {
	ZK_SYNC_ERA_MAINNET = 324,
}
