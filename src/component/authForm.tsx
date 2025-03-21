"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function AuthForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: phoneNumber, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Đăng nhập thất bại");
      }
      document.cookie = `token=${data.data.access_token}; path=/;`;
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Số điện thoại hoặc mật khẩu không đúng");
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex flex-col items-center mb-6">
        <Image
          src="/hydroCloud.webp"
          alt="HydroCloud Logo"
          width={80}
          height={80}
          className="rounded-full border-2 border-gray-300"
        />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent mt-2">
          HydroCloud
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <Input
          type="text"
          placeholder="Số điện thoại"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition">
          Đăng nhập
        </Button>
      </form>
    </div>
  );
}
