import axios from "axios";

export const login = async (phone_number: string, password: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3111/auth/login",
      { phone_number, password },
      {
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    throw error;
  }
};
