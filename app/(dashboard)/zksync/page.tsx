'use client'

import { Skeleton } from '@modules/shared/components/atoms'
import { useIsMounted } from '@modules/shared/hooks'
import { SingleAddressSearch } from '@molecules'
import { SingleZksyncContent } from '@organisms'
import { useSingleZksyncStore } from '@stores'

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
