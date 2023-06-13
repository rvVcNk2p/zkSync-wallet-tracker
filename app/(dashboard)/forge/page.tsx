'use client'

import { useToast } from '@hooks'
import { TokenDeployer } from '@molecules'

export default function ForgePage() {
	const { toast } = useToast()
	const hadleToast = (variant?: 'default' | 'destructive') => {
		toast({
			title: 'Scheduled: Catch up',
			description: 'Friday, February 10, 2023 at 5:57 PM',
			duration: 2000,
			variant,
		})
	}

	return (
		<div className="p-2">
			<div className="grid grid-cols-1">
				<div className="blog-list__container">
					<div className="w-fit mt-6 mx-auto">
						<TokenDeployer />
					</div>
				</div>
			</div>
		</div>
	)
}
