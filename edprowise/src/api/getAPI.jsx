import axiosInstance from "./axiosConfig.jsx";

async function getAPI(
  url,
  config = {},
  isPrivate = true,
  includeParams = false
) {
  try {
    let accessToken;
    if (isPrivate) {
      accessToken = JSON.parse(localStorage.getItem("accessToken"));
    }

    let requestConfig = {
      headers: {
        access_token: accessToken,
      },
    };

    if (includeParams && config.params) {
      requestConfig.params = config.params;
    }

    if (config.responseType) requestConfig.responseType = config.responseType;

    const response = await axiosInstance.get(url, requestConfig);

    if (response.status === 200) {
      return {
        message: response.data.message,
        hasError: response.data.hasError,
        data: response.data,
      };
    }
  } catch (error) {
    console.error("Error during API request:", error);
    throw error;
  }
}

export default getAPI;
