/** @type {import('next').NextConfig} */

const nextConfig = {
	output: 'export',
	images: {
		unoptimized: true, // Add this line to disable image optimization
	  },
}
module.exports = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		})

		return config
	},
	...nextConfig
}
