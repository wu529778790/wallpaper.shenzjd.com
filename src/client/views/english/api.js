import request from "@/utils/request";

export const getEnglishApi = (params) => {
  return request({
    url: "/api/wallpaper/english",
    method: "GET",
    params,
  });
};
