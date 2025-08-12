import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },

  sassOptions: {
    quietDeps: true,
    silenceDeprecations: ["legacy-js-api"],
    logger: {
      warn: function (message) {},
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "144.24.221.37",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.50.52",
        port: "8080",
      },
      {
        protocol: "https",
        hostname: "besbaacademy.sba.sa",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "be-sbaacademy.sba.sa",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "base.test",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "0a34e086cb1a.ngrok-free.app",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
