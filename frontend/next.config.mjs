/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        dangerouslyAllowSVG: true,
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'api.dicebear.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            }
        ]
    }
};

export default nextConfig;
