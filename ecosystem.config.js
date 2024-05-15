export default {
    apps: [{
        name: "tools.shenzjd.com",
        script: "pnpm",
        args: "run start",
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: "1G",
        env: {
            NODE_ENV: "development"
        },
        env_production: {
            NODE_ENV: "production"
        }
    }],
};