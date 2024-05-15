//tags http://cdn.apc.360.cn/index.php?c=WallPaper&a=getAllCategoriesV2&from=360chrome
//new http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByOrder&order=create_time&start=【0开始】&count=【加载数】&from=360chrome
//专区 http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByCategory&cid=【分类ID】&start=【0开始】&count=【加载数】&from=360chrome

import express from "express";
import NodeCache from "node-cache";
import request from "../utils/request.js";

const router = express.Router();

// 创建一个缓存实例
const cache = new NodeCache();

// 定义通用的路由处理程序
const handleCache = async (req, res, url, cacheKey) => {
  try {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      res.json(cachedData);
      return;
    }

    const data = await request({ url });
    cache.set(cacheKey, data, 3600);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 根据 category 获取数据
router.get("/getListByCategory", async (req, res) => {
  const cid = req.query.cid || 36;
  const start = req.query.start || 0;
  const count = req.query.count || 10;
  // const url = `http://wp.birdpaper.com.cn/intf/GetListByCategory?cids=${cid}&pageno=${start}&count=${count}`;
  const url = `http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByCategory&cid=${cid}&start=${start}&count=${count}&from=360chrome`;
  const cacheKey = `birdpaper_${cid}_${start}_${count}`;
  await handleCache(req, res, url, cacheKey);
});

// 获取 category 数据
router.get("/category", async (req, res) => {
  // const url = `http://wp.birdpaper.com.cn/intf/getCategory`;
  const url = `http://cdn.apc.360.cn/index.php?c=WallPaper&a=getAllCategoriesV2&from=360chrome`;
  const cacheKey = "category";
  await handleCache(req, res, url, cacheKey);
});

// 获取最新列表数据
router.get("/newest", async (req, res) => {
  const start = req.query.start || 0;
  const count = req.query.count || 10;
  // const url = `http://wp.birdpaper.com.cn/intf/newestList?pageno=${pageno}&count=${count}`;
  const url = `http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByOrder&order=create_time&start=${start}&count=${count}&from=360chrome`;
  const cacheKey = `newest_${start}_${count}`;
  await handleCache(req, res, url, cacheKey);
});

/**
 * @description 获取 bing 图片存档
 * @router get /wallpaper/bing
 * @response
 */
router.get("/bing", async (req, res) => {
  const idx = req.query.idx || 0; // 请求图片截止天数 0:今天 1:截止至昨天 -1:截止至明天
  const n = req.query.n || 8; // 请求图片数量 最多一次获取8张
  const url = `http://cn.bing.com/HPImageArchive.aspx?format=js&idx=${idx}&n=${n}&mkt=zh-CN`;
  const cacheKey = `bingImageArchive_${idx}_${n}`;
  await handleCache(req, res, url, cacheKey);
});

// 搜索数据
router.get("/search", async (req, res) => {
  const content = req.query.content || "";
  const start = req.query.start || 0;
  const count = req.query.count || 10;
  const url = `http://wp.birdpaper.com.cn/intf/search?content=${content}&pageno=${start}&count=${count}`;
  const cacheKey = `search_${content}_${start}_${count}`;
  await handleCache(req, res, url, cacheKey);
});

export default router;
