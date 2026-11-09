/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["passkit-generator"],
  experimental: { optimizePackageImports: ["iconoir-react"] },
  outputFileTracingIncludes: { "/api/wallet/apple": ["./wallet/**/*"] },
};
export default nextConfig;
