// 获取连接池
import pool from "../genericPool/index.js";
import { KnownDevices } from "puppeteer";

export default async (req, res) => {
  // 使用连接池资源
  return await pool.use(async (browser) => {
    // 打开新的页面
    const page = await browser.newPage();
    const {
      device,
      width,
      height,
      deviceScaleFactor,
      waitUntil,
      url,
      displayHeaderFooter, // 是否显示页眉和页脚
      footerTemplate, // 页脚模板
      format, // 页面大小
      headerTemplate, // 页眉模板
      landscape, // 是否横向
      margin = {
        top: '',
        bottom: '',
        left: '',
        right: '',
      },
      omitBackground, // 隐藏默认的白色背景，并允许生成透明的 pdf。
      outline, // 生成大纲
      pageRanges, // 要打印的纸张范围，例如 1-5, 8, 11-13。 空字符串，表示打印所有页面。
      preferCSSPageSize, // 优先使用 CSS 页面大小:为页面中声明的任何 CSS @page 大小提供优先于 width 或 height 或 format 选项中声明的大小
      printBackground, // 打印背景
      scale, // 页面缩放
      tagged, // 是否打印标签
      timeout, // 超时时间
    } = req.body;
    let data;
    try {
      if (!KnownDevices[device]) {
        // 设置浏览器视口
        await page.setViewport({
          width: Number(width),
          height: Number(height),
          deviceScaleFactor: Number(deviceScaleFactor),
        });
      }
      if (KnownDevices[device]) {
        await page.emulate(KnownDevices[device]);
      }
      // 访问 URL 页面
      if (url) {
        await page.goto(url, {
          waitUntil: waitUntil.split(","),
        });
      }
      // 生成pdf
      data = await page.pdf({
        width,
        height,
        displayHeaderFooter, // 是否显示页眉和页脚
        footerTemplate, // 页脚模板
        format, // 页面大小
        headerTemplate, // 页眉模板
        landscape, // 是否横向
        margin: {
          top: margin.top,
          bottom: margin.bottom,
          left: margin.left,
          right: margin.right,
        },
        omitBackground, // 隐藏默认的白色背景，并允许生成透明的 pdf。
        outline, // 生成大纲
        pageRanges, // 要打印的纸张范围，例如 1-5, 8, 11-13。 空字符串，表示打印所有页面。
        preferCSSPageSize, // 优先使用 CSS 页面大小:为页面中声明的任何 CSS @page 大小提供优先于 width 或 height 或 format 选项中声明的大小
        printBackground, // 打印背景
        scale, // 页面缩放
        tagged, // 是否打印标签
        timeout, // 超时时间
      })
    } catch (error) {
      throw error;
    } finally {
      page.close();
    }
    res.set("Content-Type", `application/pdf`, 'Content-Length', data.length);
    res.send(data);
  });
};
