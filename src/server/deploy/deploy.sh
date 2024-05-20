#!/bin/bash

git checkout main
git pull
# pnpm install
pnpm run build
pm2 restart wallpaper.shenzjd.com