"use client";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Package, ShoppingBag, Boxes } from "lucide-react";
import ProtectedRoute from "@/component/ProtectedRoute";
import NavBar from "@/component/navbarx";

const data = [
  { name: "Jan", sales: 4000, profit: 2000 },
  { name: "Feb", sales: 3000, profit: 1500 },
  { name: "Mar", sales: 5000, profit: 3200 },
  { name: "Apr", sales: 7000, profit: 4000 },
  { name: "May", sales: 6000, profit: 3500 },
];

export default function HomePage() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen bg-gray-100">
        <NavBar />

        <div className="flex-grow p-4">
          <div className="bg-white shadow-md rounded-xl h-full flex flex-col p-4">
            <h2 className="text-lg font-semibold mb-3">Thống kê doanh thu</h2>
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="sales" stroke="#4F46E5" fill="#6366F1" opacity={0.3} />
                  <Area type="monotone" dataKey="profit" stroke="#22C55E" fill="#86EFAC" opacity={0.4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="h-[100px] bg-white shadow-lg flex justify-around items-center border-t">
          <NavItem href="/products" icon={<Package className="h-6 w-6" />} label="Sản phẩm" />
          <NavItem href="/orders" icon={<ShoppingBag className="h-6 w-6" />} label="Đơn hàng" />
          <NavItem href="/warehouse" icon={<Boxes className="h-6 w-6" />} label="Kho hàng" />
        </div>
      </div>
    </ProtectedRoute>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex flex-col items-center text-gray-700 hover:text-blue-500 transition">
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
}
