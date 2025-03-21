"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("token");

      if (!token) {
        router.push("/auth");
        return;
      }

      try {
        const res = await fetch("/api/auth", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Token không hợp lệ");

        const { data } = await res.json();
        Cookies.set("user", JSON.stringify(data.userWithoutPassword), { expires: 7 });
        Cookies.set("tenant", JSON.stringify(data.tenant), { expires: 7 });
        setTimeout(() => {
          setLoading(false);
        }, 100);
      } catch (error) {
        Cookies.remove("token");
        Cookies.remove("user");
        Cookies.remove("tenant");
        router.push("/auth");
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <div>Đang kiểm tra xác thực...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
