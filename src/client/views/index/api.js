import request from "@/utils/request";
/**
 * A function to get the newest wallpaper API.
 *
 * @param {Object} params - The parameters for the API request.
 * @return {Promise} The API request response.
 */
export const getNewestApi = (params) => {
  return request({
    url: "/api/wallpaper/newest",
    method: "GET",
    params,
  });
};

/**
 * Retrieves a list of wallpapers based on the specified category.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.category - The category of wallpapers to retrieve.
 * @return {Promise} A promise that resolves to the response from the API request.
 */
export const getListByCategoryApi = (params) => {
  return request({
    url: "/api/wallpaper/getListByCategory",
    method: "GET",
    params,
  });
};
