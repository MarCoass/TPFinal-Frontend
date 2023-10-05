
const { resolve } = require('path');

module.exports = {
    webpack: config => {
        config.resolve.alias['@'] = resolve(__dirname, 'src')
        return config
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8000/api/:path*',
            },
        ]
    },
}
