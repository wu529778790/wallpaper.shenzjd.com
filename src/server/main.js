import express from "express";
import ViteExpress from "vite-express";
import puppeteer from "./puppeteer/index.js";
import wallpaper from "./wallpaper/index.js";

const app = express();
const router = express.Router();

// 解析此应用程序的 JSON 正文。确保在路由处理程序之前放置 app.use(express.json())
app.use(express.json());

// 全局日志
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// })

// 添加/api前缀
app.use("/api", router);

router.use("/puppeteer", puppeteer);

router.use("/wallpaper", wallpaper);

const server = app.listen(3000, '0.0.0.0', () => {
  console.log("Click here to open the browser: http://localhost:3000");
})

ViteExpress.bind(app, server);
