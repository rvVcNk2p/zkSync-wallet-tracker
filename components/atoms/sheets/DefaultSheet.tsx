import { Button } from '@/components/ui'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'

interface DefaultSheetProps {
	children: React.ReactNode
	trigger?: React.ReactNode
	title?: React.ReactNode | string
	description?: React.ReactNode | string
	footer?: React.ReactNode
	position?: 'top' | 'right' | 'bottom' | 'left'
	size?: 'sm' | 'default' | 'lg' | 'xl' | 'full' | 'content'
}
const DefaultSheet = ({
	children,
	trigger,
	title,
	description,
	footer,
	position = 'left',
	size = 'default',
}: DefaultSheetProps) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost">{trigger}</Button>
			</SheetTrigger>
			<SheetContent position={position} size={size}>
				<SheetHeader>
					<SheetTitle>{title}</SheetTitle>
					<SheetDescription>{description}</SheetDescription>
				</SheetHeader>
				{children}
				<SheetFooter>{footer}</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}

export default DefaultSheet
