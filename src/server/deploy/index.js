import express from "express";
import { exec } from "child_process";

const router = express.Router();

router.get("/", (req, res) => {
  const deployScript = "./deploy.sh";
  exec(deployScript, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行 ${deployScript} 脚本时发生错误：${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`执行 ${deployScript} 脚本时出现错误：${stderr}`);
      return;
    }
    console.log(`执行 ${deployScript} 脚本成功，输出：${stdout}`);
    res.send("success");
  });
});

export default router;
