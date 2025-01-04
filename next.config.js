const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com", "lh3.googleusercontent.com"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                pathname: '/asdiop159752/BlogPost/master/images/**',
            },
            { hostname: "images.unsplash.com" },
            { hostname: "www.simplilearn.com" },
            { hostname: "www.google.com" },
            { hostname: "bathanh.com.vn" },
            {
                hostname: "https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg",
            },
            { hostname: "secure.gravatar.com" },
        ],
    },
};

module.exports = withNextIntl(nextConfig);
