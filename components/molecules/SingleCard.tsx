import { Card, Label } from '@modules/shared/components/atoms'
import { isValidElement } from 'react'

type SingleCardProps = {
	title?: string | React.ReactNode
	children: React.ReactNode
}

const renderTitle = (title: string | React.ReactNode) => {
	if (typeof title === 'string') {
		return <Label className="px-4 border-b pb-4 text-lg">{title}</Label>
	} else if (isValidElement(title)) {
		return title
	} else return null
}

const SingleCard = ({ title, children }: SingleCardProps) => {
	return (
		<Card className="w-full flex flex-col gap-4 py-4 shadow-md">
			{renderTitle(title)}
			<div className="px-4">{children}</div>
		</Card>
	)
}

export default SingleCard
