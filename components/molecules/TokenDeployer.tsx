import { Button } from '@ui'
import { erc20Contract } from '@utils'
import { useEffect, useState } from 'react'
import {
	useAccount,
	useNetwork,
	useWaitForTransaction,
	useWalletClient,
} from 'wagmi'

const TokenDeployer = (): JSX.Element => {
	const [transactionHash, setTransactionHash] = useState<
		`0x${string}` | undefined
	>(undefined)
	const { data: walletClient, isError, isLoading } = useWalletClient()
	const { chain } = useNetwork()
	const {
		data: transaction,
		isError: isTransactionError,
		isLoading: isTransactionLoading,
	} = useWaitForTransaction({
		chainId: chain?.id,
		hash: transactionHash,
	})
	const { address, isConnected } = useAccount()

	const hadleDeployContract = async () => {
		if (!isConnected) return

		const hash = await walletClient?.deployContract({
			chain,
			...erc20Contract,
			address,
		})

		setTransactionHash(hash)

		console.log(`https://sepolia.etherscan.io/tx/%s`, hash)
	}

	useEffect(() => {
		transaction && console.log(transaction)
	}, [transaction])

	return (
		<>
			<Button onClick={hadleDeployContract}>Deploy ERC20 Contract</Button>

			{isTransactionLoading && <div>Processing…</div>}
			{isTransactionError && <div>Transaction error</div>}
		</>
	)
}

export default TokenDeployer
