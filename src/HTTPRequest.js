import axios from 'axios';
import Cookies from 'js-cookie';

const axiosClient = axios.create({
  baseURL: "http://localhost:8090/",//window.__ENV__.API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosClient.interceptors.request.use(async (config) => {
  if (config.url === "/user-service/grant-guest") {
    return config;
  }
  let csrfToken = Cookies.get("XSRF-TOKEN");

  if (!csrfToken) {
    await axiosClient.get("/user-service/grant-guest", {
      _skipXsrf: true,
    });
    csrfToken = Cookies.get("XSRF-TOKEN");
    if (!csrfToken) {
      throw new Error("Issue with XSRF token");
    }
  }
  config.headers["X-XSRF-TOKEN"] = csrfToken;
  return config;
});

export default async function apiCall(url, method="GET", data={}, responseType="application/json", async = true) {
    const response = await axiosClient({
      url:url,
      method:method,
      data:data,
      responseType:responseType
    }).then(response => {
      return response.data;
    }).catch(error => {
      if(error?.status === 401){
        axiosClient.get("/user-service/grant-guest", {
        _skipXsrf: true,
    });
      }
      console.log(error);
      return null;
    });

    return response;
}