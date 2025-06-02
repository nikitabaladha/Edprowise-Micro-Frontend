import axiosInstance from "./axiosConfig.jsx";

async function patchAPI(url, data = {}, isPrivate = true) {
  try {
    let accessToken;
    if (isPrivate) {
      accessToken = JSON.parse(localStorage.getItem("accessToken"));
    }

    const response = await axiosInstance.patch(url, data, {
      headers: {
        access_token: accessToken,
      },
    });

    return {
      hasError: response.data.hasError,
      message: response.data.message,
      data: response.data,
    };
  } catch (error) {
    console.error("PATCH request failed:", error);
    throw error;
  }
}

export default patchAPI;
