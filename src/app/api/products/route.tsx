import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BE;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ message: "Thiếu Authorization header" }, { status: 401 });
  }
  try {
    const response = await axios.get(`${BASE_URL}/product`, {
      headers: {
        "Accept": "*/*",
        "Authorization": authHeader,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Lỗi danh sách sản phẩm:", error.response?.data || error.message);
    return NextResponse.json(
      { message: "Lỗi danh sách sản phẩm", error: error.response?.data || error.message },
      { status: error.response?.status || 500 }
    );
  }
}


export async function POST(req: NextRequest) { 
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "Thiếu Authorization header" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const response = await axios.post(`${BASE_URL}/product`, body, {
      headers: {
        Accept: "*/*",
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Lỗi API:", error?.response?.data || error.message);
    return NextResponse.json(
      { message: "Lỗi khi gửi request", error: error?.response?.data || error.message },
      { status: error?.response?.status || 500 }
    );
  }
}