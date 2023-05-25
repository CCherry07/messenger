/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require("node:path");

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
};

module.exports = nextConfig;
