'use client'

import { ZkSyncTable } from '@organisms'

export default function DashboardPage() {
	return (
		<div className="p-2">
			<div className="grid grid-cols-1">
				<div className="blog-list__container">
					<div className="w-fit mt-6 mx-auto">zkSync Activity Tracker</div>
					<ZkSyncTable />
				</div>
			</div>
		</div>
	)
}
