import { zodResolver } from '@hookform/resolvers/zod'
import { Spinner } from '@phosphor-icons/react'
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Label,
} from '@ui'
import { erc20Contract } from '@utils'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { encodeFunctionData } from 'viem'
import {
	useAccount,
	useNetwork,
	useWaitForTransaction,
	useWalletClient,
} from 'wagmi'
import * as z from 'zod'

// Validation schema
const tokenDeployerFormSchema = z.object({
	tokenName: z.string().min(2).max(50),
	symbol: z.string().min(2).max(50),
	initialSupply: z.coerce.number().min(1),
})

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

	const hadleDeployContract = async (
		formValues: z.infer<typeof tokenDeployerFormSchema>,
	) => {
		const { tokenName, symbol, initialSupply } = formValues
		if (!isConnected) return

		const hash = await walletClient?.deployContract({
			chain,
			...erc20Contract,
			args: [tokenName, symbol, initialSupply],
			address,
		})

		setTransactionHash(hash)

		console.log(`https://sepolia.etherscan.io/tx/%s`, hash)
	}

	useEffect(() => {
		transaction && console.log(transaction)
	}, [transaction])

	const form = useForm<z.infer<typeof tokenDeployerFormSchema>>({
		resolver: zodResolver(tokenDeployerFormSchema),
		defaultValues: {
			tokenName: '',
			symbol: '',
			initialSupply: 21_000_000,
		},
	})

	function onSubmit(formValues: z.infer<typeof tokenDeployerFormSchema>) {
		hadleDeployContract(formValues)
	}

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
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="tokenName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Token Name</FormLabel>
										<FormControl>
											<Input placeholder="e.g. Bitcoin" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="symbol"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Symbol</FormLabel>
										<FormControl>
											<Input placeholder="e.g. BTC" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="initialSupply"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Initial Supply</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								className="w-full !mt-10"
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
						</form>
					</Form>
				</CardContent>
			</Card>
		</>
	)
}

export default TokenDeployer
