'use client'

import { useToast } from '@hooks'
import { TokenDeployer } from '@molecules'
import { Button, Label } from '@ui'

export default function DashboardPage() {
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
					<h1 className="mb-4">Buttons</h1>

					<div className="flex gap-4">
						<Button onClick={() => hadleToast()}>Default Button</Button>
						<Button variant="outline">Outline</Button>
						<Button
							variant="destructive"
							onClick={() => hadleToast('destructive')}
						>
							Destructive
						</Button>
					</div>
					<div className="w-fit mt-10">
						<TokenDeployer />
					</div>
				</div>
			</div>
		</div>
	)
}
