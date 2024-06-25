import request from "@/utils/request";

export const fileUploadApi = (data) => {
  return request({
    url: "/api/upload/single",
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
