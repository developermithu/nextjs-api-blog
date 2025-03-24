/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'api-blog.laravel.cloud',
            },
            {
                protocol: 'http',
                hostname: 'blog.test',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
            },
        ],
        dangerouslyAllowSVG: true,
    },
};

export default nextConfig;
