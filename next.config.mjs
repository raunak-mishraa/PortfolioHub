/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ['lh3.googleusercontent.com','avatars.githubusercontent.com'],
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            {
                protocol: 'http',
                hostname: 'res.cloudinary.com',
            }
        ]
    }
};

export default nextConfig;
