"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [tenant, setTenant] = useState<any>(null);
  const defaultAvatar = "/hydroCloud.webp"; 

  useEffect(() => {
    const userData = Cookies.get("user");
    const tenantData = Cookies.get("tenant");
    if (userData) {
        const decodedUserData = decodeURIComponent(userData);
        setUser(JSON.parse(decodedUserData));
      }
    if (tenantData) {
        const decodedTenantData = decodeURIComponent(tenantData);
        setTenant(JSON.parse(decodedTenantData));
    }
  }, []);
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("tenant");
    router.push("/auth");
  };

  return (
    <nav className="h-[60px] bg-white shadow-md px-6 flex justify-between items-center border-b">
      <div className="flex items-center space-x-3">
        <Image
          src={tenant?.picture && tenant.picture !== "Null" ? tenant.picture : defaultAvatar}
          alt="Tenant Logo"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div>
          <h1 className="text-lg font-bold text-gray-900">{tenant?.name || "Tên công ty"}</h1>
          <p className="text-xs text-gray-500">Extended by HydroCloud</p>
        </div>
      </div>

      {user ? (
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Xin chào, {user.name}</span>
          <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
            Đăng xuất
          </Button>
        </div>
      ) : (
        <Button onClick={() => router.push("/auth")} className="bg-blue-500 hover:bg-blue-600">
          Đăng nhập
        </Button>
      )}
    </nav>
  );
}
