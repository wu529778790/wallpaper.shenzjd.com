import request from "@/utils/request";

export const getBingApi = (params) => {
  return request({
    url: "/api/wallpaper/bing",
    method: "GET",
    params,
  });
};
