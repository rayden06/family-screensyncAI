/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  // The ScreenSync UI is the static page in /public/index.html; serve it at the site root.
  async rewrites() {
    return {
      beforeFiles: [{ source: '/', destination: '/index.html' }],
    }
  },
}

export default nextConfig
