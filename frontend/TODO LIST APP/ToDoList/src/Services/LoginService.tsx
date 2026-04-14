import ApiClient from "./Api-Client";
import { type LoginRequest,type LoginResponse } from "../Models/loginmodel";

const AuthService = {
  login: async (request: LoginRequest): Promise<LoginResponse> => {
    const response = await ApiClient.post<LoginResponse>("/ToDo/login", request);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("token");
  },
};

export default AuthService;
