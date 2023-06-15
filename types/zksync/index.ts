export interface TokenInfo {
	l1Address: string
	l2Address: string
	address: string
	symbol: string
	name: string
	decimals: number
	usdPrice: string
}

export interface ERC20Transfer {
	tokenInfo: TokenInfo
	from: string
	to: string
	amount: string
}

export interface BalanceChange {
	tokenInfo: TokenInfo
	from: string
	to: string
	amount: string
	type: string
}

export interface Transaction {
	transactionHash: string
	data: {
		contractAddress: string
		calldata: string
		value: string
		factoryDeps: null
	}
	isL1Originated: boolean
	status: string
	fee: string
	nonce: number
	blockNumber: number
	l1BatchNumber: number
	blockHash: string
	indexInBlock: number
	initiatorAddress: string
	receivedAt: string
	miniblockTimestamp: number
	ethCommitTxHash: string
	ethProveTxHash: string
	ethExecuteTxHash: string
	erc20Transfers: ERC20Transfer[]
	balanceChanges: BalanceChange[]
	type: number
}

export interface TransactionResponse {
	list: Transaction[]
	total: number
}
