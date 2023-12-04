/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  experimental: {
    urlImports: ["https://cdnjs.cloudflare.com/ajax/libs/marked/11.0.0/lib/marked.esm.js"]
  },
}
