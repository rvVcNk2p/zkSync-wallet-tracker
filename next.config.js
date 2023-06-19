/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.experiments = {
			...config.experiments,
			topLevelAwait: true,
		}
		return config
	},
	async redirects() {
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
