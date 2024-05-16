export default {
  apps: [
    {
      name: "wallpaper.shenzjd.com",
      node_args: "--experimental-modules",
      script: "pnpm",
      args: "run start",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
