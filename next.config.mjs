/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	experimental: {
		swcPlugins: [
			[
				"fluentui-next-appdir-directive",
				{ paths: ["@griffel", "@fluentui"] },
			],
		],
	},
};

export default nextConfig;
