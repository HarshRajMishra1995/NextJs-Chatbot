/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disables ESLint rule checking during production builds.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
