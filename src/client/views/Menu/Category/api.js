import request from "@/utils/request";

export const getCategoryApi = () => {
  return request({
    url: "/api/wallpaper/category",
    method: "GET",
  });
};
