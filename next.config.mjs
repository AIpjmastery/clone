import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/public_html/landing.html',
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias['lib'] = path.join(__dirname, 'lib');
    return config;
  },
};
