/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["localhost", "utfs.io"],
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
