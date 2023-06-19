import AuthForm from '@/components/molecules/forms/AuthForm'
import { Command } from 'lucide-react'

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = ({}: LoginPageProps) => {
	return (
		<div>
			<div className="container relative flex-col items-center justify-center hidden h-screen md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
				<div className="relative flex-col hidden h-full p-10 text-white bg-muted dark:border-r lg:flex">
					<div
						className="absolute inset-0 bg-cover"
						style={{
							backgroundImage: 'url(/login_md_eye.png)',
						}}
					/>
					<div className="relative z-20 flex items-center text-lg font-medium">
						<Command className="w-6 h-6 mr-2" /> Airdrop Hunter
					</div>
					<div className="relative z-20 mt-auto">
						<blockquote className="space-y-2">
							<p className="text-lg">
								&ldquo;ERC-20 tokens: Unlocking boundless potential in a
								decentralized world.&rdquo;
							</p>
							<footer className="text-sm">@ChatGPT</footer>
						</blockquote>
					</div>
				</div>
				<div className="lg:p-8">
					<div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[350px]">
						<AuthForm />
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
