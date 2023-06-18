import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { CheckFat, XCircle } from '@phosphor-icons/react'
import { TaskDescriptor } from '@types'

type AccordionProps = {
	tasks: TaskDescriptor[]
}

export function AchievementAccordion({ tasks }: AccordionProps) {
	return (
		<Accordion type="multiple" className="w-full">
			{tasks.map((task, idx) => {
				return (
					<AccordionItem value={idx + ''} key={idx}>
						<AccordionTrigger>{task.title.toUpperCase()}</AccordionTrigger>
						<AccordionContent>
							<div className="flex flex-col justify-start items-start gap-4">
								{task.variants.map((variant, idx) => {
									return (
										<div className="text-base ml-4 flex" key={idx}>
											<div className="mr-2">
												{variant.isCompleted ? (
													<CheckFat
														size={24}
														weight="fill"
														className="text-primary"
													/>
												) : (
													<XCircle
														size={24}
														weight="fill"
														className="text-destructive"
													/>
												)}
											</div>
											{variant.description}
										</div>
									)
								})}
							</div>
						</AccordionContent>
					</AccordionItem>
				)
			})}
		</Accordion>
	)
}

export default AchievementAccordion
