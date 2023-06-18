export interface RawTaskVariables {
	variables: Record<string, string>
}
export interface RawTaskVariant extends RawTaskVariables {
	isCompleted: boolean
}

export interface RawTask {
	title: string
	description: string
	variants: RawTaskVariant[]
}

export interface Task {
	isCompleted: boolean
	description: string
}

export interface TaskDescriptor {
	title: string
	variants: Task[]
}
