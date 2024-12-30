/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "***", // Allow this specific hostname
        },
      ],
    },
  };
  
  export default nextConfig; // Use export default for ES modules
  