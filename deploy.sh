#!/bin/bash

cd /www/wwwroot/wallpaper.shenzjd.com
git pull
pnpm install
pnpm run build
pm2 restart wallpaper.shenzjd.com