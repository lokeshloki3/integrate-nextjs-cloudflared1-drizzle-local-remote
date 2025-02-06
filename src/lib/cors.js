// const allowedOrigins = [
//     'http://localhost:3000',
//     'http://localhost:3001',
//     'http://localhost:3002',
//     'https://svb-platform.pages.dev',
//     'https://saral-template-project.pages.dev'
// ];

// export function corsHeaders(request) {
//     const origin = request.headers.get('Origin');
//     return allowedOrigins.includes(origin)
//         ? { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization', 'Access-Control-Allow-Credentials': 'true' }
//         : { 'Access-Control-Allow-Origin': 'null' };
// }


// cors.js

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'https://svb-platform.pages.dev',
    'https://saral-template-project.pages.dev',
    'https://integrate-nextjs-cloudflared1-drizzle-local-remote.pages.dev',  // Add your frontend URL here
];

export function corsHeaders(request) {
    const origin = request.headers.get('Origin');
    if (allowedOrigins.includes(origin)) {
        return {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true',
        };
    }
    return { 'Access-Control-Allow-Origin': 'null' };
}
