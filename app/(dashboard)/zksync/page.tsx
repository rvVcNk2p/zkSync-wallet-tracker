'use client'

import { Skeleton } from '@modules/shared/components/atoms'
import { useIsMounted } from '@modules/shared/hooks'
import {
	SingleAddressSearch,
	SingleZksyncContent,
} from '@modules/zksync/components'
import { useSingleZksyncStore } from '@modules/zksync/stores'

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
