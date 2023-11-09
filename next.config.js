/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["localhost"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*.googleusercontent.com",
				port: "",
				pathname: "**",
			},
		],
	},
	reactStrictMode: false,
};

module.exports = nextConfig;
