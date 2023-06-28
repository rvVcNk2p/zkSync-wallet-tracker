import { TokenDeployer } from '@modules/forge/components'

const ForgePage = () => {
	return (
		<div className="p-2">
			<div className="grid grid-cols-1">
				<div className="w-fit mt-6 mx-auto">
					<TokenDeployer />
				</div>
			</div>
		</div>
	)
}

export default ForgePage
