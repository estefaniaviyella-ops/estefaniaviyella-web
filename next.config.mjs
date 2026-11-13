/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // anchos a medida y más calidad: las obras se ven nítidas también en pantallas retina
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2048, 2560, 3200, 3840],
    imageSizes: [170, 256, 340, 384, 512],
    qualities: [75, 92, 96],
  },
};

export default nextConfig;
