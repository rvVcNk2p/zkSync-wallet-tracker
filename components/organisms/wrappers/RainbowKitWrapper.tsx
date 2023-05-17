'use client'

import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { FC } from 'react'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { arbitrum, mainnet, polygon, sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient, webSocketPublicClient } = configureChains(
	[sepolia, mainnet, polygon, arbitrum],
	[publicProvider()],
)

const { connectors } = getDefaultWallets({
	appName: 'Token Forge',
	chains,
})

const config = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
	webSocketPublicClient,
})

export interface RainbowKitWrapperProps {
	children: React.ReactNode
}

const RainbowKitWrapper: FC<RainbowKitWrapperProps> = (props) => {
	return (
		<WagmiConfig config={config}>
			<RainbowKitProvider chains={chains}>{props.children}</RainbowKitProvider>
		</WagmiConfig>
	)
}

export default RainbowKitWrapper
