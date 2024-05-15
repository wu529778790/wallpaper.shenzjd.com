/**
 * @param {object} options
 * @param {string} options.oldUrl - 360图片的链接
 * @param {number} [options.width=480] - 想要得到的图片宽度
 * @param {number} [options.height=270] - 想要得到的图片高度
 * @param {number} [options.quality=0] - 图片质量
 * @returns {string} - 解码后的图片链接
 */
export const decode360Url = ({
  oldUrl,
  width = 480,
  height = 270,
  quality = 0,
}) => {
  // 将 360 的图片链接从 /r/__85/ changed to /m/<width>_<height>_<quality>
  return oldUrl.replace(
    "r/__85",
    "m/" + parseInt(width) + "_" + parseInt(height) + "_" + quality
  );
};
