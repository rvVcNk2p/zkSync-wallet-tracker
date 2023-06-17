'use client'

import { useIsMounted } from '@/hooks'
import { SingleAddressSearch } from '@molecules'
import { SingleZksyncContent } from '@organisms'
import { useSingleZksyncStore } from '@stores'
import { Skeleton } from '@ui'

const ZksyncPage = () => {
	const address = useSingleZksyncStore((state) => state.address)
	const isMounted = useIsMounted()

	return (
		<div className="mx-auto mt-10 mb-10">
			{isMounted ? (
				<>{address ? <SingleZksyncContent /> : <SingleAddressSearch />}</>
			) : (
				<Skeleton className="w-full min-h-screen" />
			)}
		</div>
	)
}

export default ZksyncPage
