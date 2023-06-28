import { ChainIds } from '@modules/shared/constants'
import { Address } from 'viem'

interface TokenAddresses {
	[key: number]: {
		[key: string]: Address
	}
}

export const tokenAddresses: TokenAddresses = {
	[ChainIds.ZK_SYNC_ERA_MAINNET]: {
		WETH: '0x5aea5775959fbc2557cc8789bc1bf90a239d9a91',
		USDC: '0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4',
	},
}
