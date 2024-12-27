import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
        {
            protocol: "https",
            hostname: "links.papareact.com",
        }, 
        {
            protocol: "https",
            hostname: "image.tmdb.org",
        },
        {
            protocol: "https",
            hostname: "links.pagereact.com",
        }, 
        {
            protocol: "http",
            hostname: "image.tmdb.org",
        }, 
    ]
}
};

export default nextConfig;
