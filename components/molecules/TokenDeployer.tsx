import { Spinner } from '@phosphor-icons/react'
import {
	Button,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Input,
	Label,
	Slider,
} from '@ui'
import { Card } from '@ui'
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
			<Card>
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">ERC20 Contract</CardTitle>
					<CardDescription>
						Create your unique cypto token within 20 seconds
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					{/* <div className="relative">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">
								Or continue with
							</span>
						</div>
					</div> */}
					<div className="grid gap-2">
						<Label htmlFor="token-name">Token name</Label>
						<Input id="token-name" type="text" placeholder="e.g. Bitcoin" />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="token-symbol">Symbol</Label>
						<Input id="token-symbol" type="text" placeholder="e.g. BTC" />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="initial-supply">Initial Supply</Label>
						<Input
							id="initial-supply"
							type="number"
							defaultValue={21_000_000}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="initial-supply">Decimals(1-18)</Label>
						<Slider defaultValue={[18]} max={18} min={1} step={1} />
					</div>
				</CardContent>
				<CardFooter>
					<Button
						className="w-full"
						onClick={hadleDeployContract}
						disabled={isTransactionLoading}
					>
						{isTransactionLoading ? (
							<Label className="flex items-center">
								<Spinner size={14} className="animate-spin mr-1" />
								Processing…
							</Label>
						) : (
							<Label className="cursor-pointer">Deploy</Label>
						)}
					</Button>

					{isTransactionError && <div>Transaction error</div>}
				</CardFooter>
			</Card>
		</>
	)
}

export default TokenDeployer
