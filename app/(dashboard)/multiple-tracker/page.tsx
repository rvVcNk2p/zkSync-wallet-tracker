'use client'

import { useIsMounted } from '@hooks'
import { ZkSyncTable } from '@organisms'
import { useTrackedAddressesStore } from '@stores'
import { Skeleton } from '@ui'

export default function MultipleAddressTrackerPage() {
	const isMounted = useIsMounted()
	return (
		<div className="p-2">
			<div className="grid grid-cols-1">
				<div className="blog-list__container">
					<div className="w-fit mt-6 mx-auto">zkSync Activity Tracker</div>
					{isMounted ? (
						<ZkSyncTable />
					) : (
						<div className="flex flex-col gap-4 mt-10">
							<Skeleton className="w-full min-h-[50px]"></Skeleton>
							<Skeleton className="w-full min-h-[200px]"></Skeleton>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}