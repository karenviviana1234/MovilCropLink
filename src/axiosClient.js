import axios from "axios";
import { IP } from "./screens/IP";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ip = IP
const axiosClient = axios.create({
  baseURL: `http://${ip}:3000`,
});

axiosClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers['token'] = token;
      }
    } catch (error) {
      console.error("Error getting token from AsyncStorage:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;

/* import axios from "axios";
import { IP } from "./screens/IP";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ip = IP;
const axiosClient = axios.create({
  baseURL: `http://${ip}:3000`,
});

axiosClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error getting token from AsyncStorage:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient; */
