/** @type {import('next').NextConfig} */
const nextConfig = {

	images: {
		domains: process.env.NODE_ENV === "production" ? [process.env.BASE_URL] : ["localhost"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*.googleusercontent.com",
				port: "",
				pathname: "**",
			},
		],
	},
	reactStrictMode: true,
};

module.exports = nextConfig;
