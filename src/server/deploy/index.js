import express from "express";
import { exec } from "child_process";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("success");
  exec("bash ./src/server/deploy/deploy.sh", (error, stdout, stderr) => {
    if (error) {
      console.error(`执行脚本时发生错误：${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`执行脚本时出现错误：${stderr}`);
      return;
    }
    console.log(`执行脚本成功，输出：${stdout}`);
  });
});

export default router;
