import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BE;

/**
 * Đăng nhập (POST)
 */
export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Lỗi đăng nhập:", error.response?.data || error.message);
    return NextResponse.json(
      { message: "Lỗi khi gọi API đăng nhập", error: error.response?.data || error.message },
      { status: error.response?.status || 500 }
    );
  }
}

/**
 * Lấy thông tin Profile (GET)
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "Thiếu Authorization header" }, { status: 401 });
  }

  try {
    const response = await axios.get(`${BASE_URL}/users/profile`, {
      headers: {
        "Accept": "*/*",
        "Authorization": authHeader,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Lỗi lấy profile:", error.response?.data || error.message);
    return NextResponse.json(
      { message: "Lỗi khi lấy profile", error: error.response?.data || error.message },
      { status: error.response?.status || 500 }
    );
  }
}
