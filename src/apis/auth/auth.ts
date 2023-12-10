import { type } from "os";
import api from "./../base.api";
import AuthResponse from "./auth/responses/auth.response";

interface LoginResponse {
  username: string;
  password: string;
  type: any;
  token: string;
}

const login = async (
  username: string,
  password: string,
  type: string
): Promise<LoginResponse> => {
  const requestBody = {
    username: username,
    password: password,
    role: 2,
  };

  try {
    const response = await api.post("/login", requestBody);
    return response.data as LoginResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAuth = async (): Promise<AuthResponse> => {
  try {
    const response = await api.get("/auth");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const logout = async (): Promise<void> => {
  try {
    await api.post("/logout", {});
  } catch (error) {
    console.error(error);
    throw error;
  }
};

interface RegisterResponse {}

const register = async (requestBody: any): Promise<RegisterResponse> => {
  try {
    const response = await api.post("/register", requestBody);
    return response.data as RegisterResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  login,
  getAuth,
  logout,
  register,
};
