/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
};

if (process.env.NODE_ENV === "development") {
  nextConfig.headers = async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
      ],
    },
  ];
}

export default nextConfig;
