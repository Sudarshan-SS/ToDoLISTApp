import axios,{type AxiosInstance, type InternalAxiosRequestConfig,type AxiosError,type AxiosResponse} from "axios";


const Base_Url="https://localhost:7099/api";

const ApiClient:AxiosInstance=axios.create({
    baseURL:Base_Url,
    headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});


ApiClient.interceptors.request.use((config:InternalAxiosRequestConfig)=>{
const token=localStorage.getItem("Token");
if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; 
  },
(error: AxiosError) => Promise.reject(error)
);


ApiClient.interceptors.response.use((response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  });


  export default ApiClient;