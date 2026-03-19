/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript:{
    ignoreBuildErrors:true
  },
  eslint:{
    ignoreDuringBuilds:true,
  },
  transpilePackages: ['recharts']
};


export default nextConfig;
