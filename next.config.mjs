/** @type {import('next').NextConfig} */
const nextConfig = (phase) => ({
  // Keep development output separate from production verification and serving.
  distDir: phase === 'phase-development-server' ? '.next' : '.next-production',
});

export default nextConfig;
