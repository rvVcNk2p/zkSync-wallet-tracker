'use client'

import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { FC } from 'react'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { arbitrum, bsc, mainnet, polygon, sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient, webSocketPublicClient } = configureChains(
	[
		{
			...mainnet,
			iconUrl: 'chains/ethereum.svg',
		},
		{
			...sepolia,
			iconUrl: 'chains/ethereum.svg',
		},
		{
			...bsc,
			iconUrl: 'chains/bsc.svg',
		},
		{
			...polygon,
			iconUrl: 'chains/polygon.svg',
		},
		{
			...arbitrum,
			iconUrl: 'chains/arbitrum.svg',
		},
	],
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
