import createPuppeteerPool from "./createPuppeteerPool.js";

const pool = createPuppeteerPool({
  puppeteerArgs: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    ignoreHTTPSErrors: true,
    timeout: 0,
    pipe: true, // 不使用 websocket 
  },
});

export default pool;
