const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  theme: {
    extend: {
      screens: {
        'print': { 'raw': 'print' },
      },
      display: ['responsive', 'group-hover', 'group-focus', 'hover', 'focus', 'print'],
    },
  },
  plugins: [],
};

module.exports = withPWA(nextConfig);
