'use client'

import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { FC } from 'react'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { arbitrum, bsc, mainnet, polygon, sepolia, zkSync } from 'wagmi/chains'
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
		{
			...zkSync,
			iconUrl: 'chains/ethereum.svg',
		},
	],
	[publicProvider()],
)

const { connectors } = getDefaultWallets({
	appName: 'Airdrop Hunter',
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
