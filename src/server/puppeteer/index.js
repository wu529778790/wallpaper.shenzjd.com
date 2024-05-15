import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

const modulesPath = path.join(__dirname, "module");

fs.readdirSync(modulesPath).forEach(async (file) => {
  const modulePath = path.join(modulesPath, file);
  const module = await import('file://' + modulePath.replace(/\\/g, '/'));
  const moduleName = path.basename(file, ".js");

  // 根据文件名动态生成路由
  router.use(`/${moduleName}`, module.default);
});

export default router;