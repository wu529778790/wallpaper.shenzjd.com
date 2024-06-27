import express from "express";
import multiparty from "multiparty";

const router = express.Router();
const uploadDir = "./src/server/static";
/**
 * Uploads a file using the multiparty library.
 *
 * @param {Object} req - The request object containing the file to be uploaded.
 * @return {Promise<Object>} A promise that resolves to an object containing the parsed fields and files.
 */
const multipartyUpload = (req) => {
  return new Promise(async (resolve, reject) => {
    const form = new multiparty.Form({
      maxFilesSize: 1024 * 1024 * 1024,
      uploadDir,
    });
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ fields, files });
    });
  });
};

router.post("/single", async (req, res) => {
  try {
    let { files } = await multipartyUpload(req);
    let file = (files.file && files.file[0]) || {};
    res.send({
      code: 0,
      message: "上传成功",
      data: {
        fileName: file.originalFilename,
        fileUrl: file.path.replaceAll("\\", "/").replace("/static", ""),
      },
    });
  } catch (error) {
    res.send({
      code: 1,
      message: error.message,
    });
  }
});

export default router;
