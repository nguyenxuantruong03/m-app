/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:["res.cloudinary.com"]
    },
    async headers() {
        return [
          {
            source: '/api/:path*', // Update this source pattern to match your API routes
            headers: [
              {
                key: 'Access-Control-Allow-Origin',
                value: '*',
              },
              {
                key: 'Access-Control-Allow-Methods',
                value: 'POST, GET, OPTIONS, PUT, DELETE',
              },
              {
                key: 'Access-Control-Allow-Headers',
                value: 'Content-Type, X-Auth-Token, Origin, Authorization',
              },
            ],
          },
        ];
      },
}

module.exports = nextConfig
