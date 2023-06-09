/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require("node:path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const { i18n } = require("./next-i18next.config");

const __DEV__ = process.env.NODE_ENV === "development";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const envConfig = require("dotenv").config({
  path: __DEV__
    ? resolve(process.cwd(), "../../.dev.env")
    : resolve(process.cwd(), "../../.prod.env"),
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // i18n,
  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
  env: {
    ...envConfig.parsed,
  },
  experimental: {
    swcPlugin: ["next-superjson-plugin", {}],
  },
};

module.exports = nextConfig;
