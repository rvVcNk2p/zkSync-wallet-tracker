/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.experiments = {
			...config.experiments,
			topLevelAwait: true,
		}
		return config
	},
}

module.exports = {
	...nextConfig,
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
