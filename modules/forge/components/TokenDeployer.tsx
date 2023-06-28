'use client'

import { erc20Contract } from '@constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@hooks'
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Input,
	Label,
} from '@modules/shared/components/atoms'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@modules/shared/components/atoms/form'
import { Spinner } from '@phosphor-icons/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { shortenerAddress } from '@utils'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BaseError } from 'viem'
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
	const { data: walletClient } = useWalletClient()
	const { chain } = useNetwork()
	const { data: transaction, isLoading: isTransactionLoading } =
		useWaitForTransaction({
			chainId: chain?.id,
			hash: transactionHash,
			onSuccess(data) {
				const { contractAddress } = data
				toast({
					duration: 60000,
					title: `🎉 Your token is now live and ready!`,
					description: (
						<div className="flex flex-col gap-1 mt-4">
							<Label>
								Contract:
								<Link
									target="_blank"
									href={`https://sepolia.etherscan.io/address/${contractAddress}`}
									className="ml-2 hover:underline"
								>
									{shortenerAddress(contractAddress as string, 5, 12)}
								</Link>
							</Label>
							<Label>
								Token:
								<Link
									target="_blank"
									href={`https://sepolia.etherscan.io/token/${contractAddress}`}
									className="ml-2 hover:underline"
								>
									{`${form.getValues().tokenName} (${form.getValues().symbol})`}
								</Link>
							</Label>
						</div>
					),
				})
			},
			onError(error) {
				if (error instanceof BaseError) {
					toast({
						variant: 'destructive',
						title: error.shortMessage,
						description: error.details,
					})
				}
			},
		})
	const { address, isConnected } = useAccount()
	const { toast } = useToast()

	const hadleDeployContract = async (
		formValues: z.infer<typeof tokenDeployerFormSchema>,
	) => {
		const { tokenName, symbol, initialSupply } = formValues
		if (!isConnected) return

		try {
			const hash = await walletClient?.deployContract({
				chain,
				...erc20Contract,
				args: [tokenName, symbol, initialSupply],
				//@ts-ignore
				address,
			})

			setTransactionHash(hash)
			console.log(`https://sepolia.etherscan.io/tx/%s`, hash)

			toast({
				title: '✅ Token deployment initiated and sent!',
				description:
					'Blockchain validating the request.\nPlease wait a few seconds.',
			})
		} catch (error) {
			if (error instanceof BaseError) {
				toast({
					variant: 'destructive',
					title: error.shortMessage,
					description: error.details,
				})
			}
		}
	}

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
		<Card>
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl">ERC20 Contract</CardTitle>
				<CardDescription>
					Create your unique cypto token within 20 seconds
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4 pb-0">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="tokenName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Token Name</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g. Bitcoin"
											{...field}
											disabled={isTransactionLoading}
										/>
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
										<Input
											placeholder="e.g. BTC"
											{...field}
											disabled={isTransactionLoading}
										/>
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
										<Input
											type="number"
											{...field}
											disabled={isTransactionLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{address ? (
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
						) : (
							// Add some adjustments to the button, like color and size
							<div className="mt-10 flex justify-center">
								<ConnectButton />
							</div>
						)}
					</form>
				</Form>
			</CardContent>
			<CardFooter></CardFooter>
		</Card>
	)
}

export default TokenDeployer
