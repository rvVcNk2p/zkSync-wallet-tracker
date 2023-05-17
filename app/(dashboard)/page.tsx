import { Button } from '@atoms'

export default function DashboardPage() {
	return (
		<div className="p-2">
			<div className="grid grid-cols-1">
				<div className="blog-list__container">
					<h1 className="mb-4">Dashboard</h1>

					<div className="flex gap-4">
						<Button>Button</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="outline">Outline</Button>
						<Button variant="destructive">Destructive</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
