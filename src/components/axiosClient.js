import axios from "axios";

export const ip = "10.193.156.61"
const axiosClient = axios.create({
  baseURL: `http://${ip}:3000`
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers['token'] = token
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosClient;