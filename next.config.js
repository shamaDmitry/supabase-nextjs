/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "auwpnhahmdioiwffqegr.supabase.co",
        port: "",
        pathname: "/storage/v1/object/sign/images/avatars/*",
      },
    ],
  },
};

module.exports = nextConfig;
