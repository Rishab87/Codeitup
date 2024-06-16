/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        dangerouslyAllowSVG: true,
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'api.dicebear.com',
            }
        ]
    }
};

export default nextConfig;
