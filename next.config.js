/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.experiments = {
			...config.experiments,
			topLevelAwait: true,
		}
		return config
	},
	redirects() {
		return [
			{
				source: '/login',
				destination: '/multiple-tracker',
				permanent: true,
			},
		]
	},
}

module.exports = nextConfig
