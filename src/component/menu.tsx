"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { X as ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import Cookies from "js-cookie";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { title } from "process";
import { label } from "framer-motion/client";

interface SidebarMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenModal: (type: string, title: string, data: any[]) => void;
}

export default function SidebarMenu({ isOpen, onToggle, onOpenModal }: SidebarMenuProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [tenant, setTenant] = useState<any>(null);
  const defaultAvatar = "/hydroCloud.webp";
  const [position, setPosition] = useState({ x: 220, y: window.innerHeight - 160 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedPosition = localStorage.getItem("avatarPosition");
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    }
  }, []);

  const savePosition = (newPosition: any) => {
    localStorage.setItem("avatarPosition", JSON.stringify(newPosition));
  };

  useEffect(() => {
    const pathname = typeof window !== "undefined" ? window.location.pathname : "";
    if (pathname.includes("/products")) setOpenMenu("products");
    else if (pathname.includes("/customer")) setOpenMenu("customer");
    else setOpenMenu(null);
  }, []);

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
  const toggleMenu = (menu: string) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("tenant");
    router.push("/auth");
  };

  const menuItems = [
    {
      label: "Hàng hóa",
      key: "products",
      links: [
        { href: "/products", label: "Hàng hóa" },
        {
          label: "Thêm hàng hóa",
          onClick: (e: React.MouseEvent) => {
            e.preventDefault();
            onOpenModal("product_add", "Thêm hàng hóa", [
              { label: "name", type: "text", title: 'Tên sản phẩm' },
              { label: "price_in", type: "number", title: 'giá đầu vào' },
              { label: "inventory", type: "number", title: 'số lượng vào kho'},
              { label: "unit", type: "string", title : "đơn vị tính" },
              { label: "discount_1", type: "number", title : "chiết khấu lần 1" },
              { label: "discount_2", type: "number", title: "chiết khấu lần 2" }
            ]);
          }
        },
      ],
    },
    {
      label: "Khách hàng",
      key: "customer",
      links: [
        { href: "/customers", label: "Khách hàng" },
        { href: "/customer/add", label: "Thêm khách hàng" },
      ],
    },
    {
      label: "Đơn hàng",
      key: "order",
      links: [
        { href: "/orders", label: "Đơn hàng" },
        { href: "/order/pending", label: "Đơn đang đặt" },
      ],
    },
    {
      label: "Kế toán",
      key: "accountant",
      links: [
        { href: "/accounting", label: "Kế toán" },
        { href: "/accounting/expenses", label: "Danh sách thu chi" },
      ],
    },
    {
      label: "Kho",
      key: "warehouse",
      links: [
        { href: "/warehouse", label: "Kho" },
        { href: "/warehouse/import", label: "Nhập kho" },
      ],
    },
  ];

  const handleMouseLeave = () => {
    stopDrag();
    setIsHovered(false);
    savePosition(position);
  };

  const startDrag = (e: any) => {
    setIsDragging(true);
  };

  const onDrag = (e: any) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - 30,
        y: e.clientY - 30,
      });
    }
  };

  const stopDrag = () => {
    setIsDragging(false);

  };

  return (
    <nav
      className={`bg-gray-200 text-black w-71 min-h-screen p-4 shadow-md fixed top-0 left-0 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-70"
        }`}
    >
      {/* Thông tin người dùng */}
      <div
        className="fixed w-14 h-14 rounded-full bg-white shadow-lg border border-gray-300 flex items-center justify-center cursor-pointer z-50"
        style={{ left: position.x, top: position.y }}
        onMouseDown={startDrag}
        onMouseMove={onDrag}
        onMouseUp={stopDrag}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}

      >
        <Image src="/logo.png" alt="avatar" width={48} height={48} className="w-12 h-12 rounded-full" />

        {/* Hiển thị thông tin khi hover */}
        {isHovered && user && (
          <div className="absolute bottom-13 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg w-48 text-center">
            <p className="text-lg font-bold">{user?.name}</p>
            <p className="text-gray-700">{user?.phone_number}</p>
            <p className="text-gray-500">{user?.role}</p>
            <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
              Đăng xuất
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-center mb-4">
        <Image
          src={tenant?.picture && tenant.picture !== "Null" ? tenant.picture : defaultAvatar}
          alt="Tenant Logo"
          width={40}
          height={40}
          className="rounded-full object-cover mr-2"
        />
        <div>
          <h1 className="text-lg font-bold text-gray-900">{tenant?.name || "Tên công ty"}</h1>
          <p className="text-xs text-gray-500">Extended by HydroCloud</p>
        </div>
        <button
          onClick={onToggle}
          className="absolute -right-5 top-1/2 transform -translate-y-1/2 text-black bg-gray-200 p-2 transition"
          style={{
            clipPath: "polygon(25% 0%, 100% 10%, 100% 90%, 25% 100%)",
            width: "27px",
            height: "230px",
          }}
        >
          {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>


      </div>

      <ul className="flex flex-col space-y-4">
        <li>
          <Link href="/" className="block px-5 py-2 rounded-md hover:bg-blue-200 transition">
            Trang chủ
          </Link>
        </li>

        {menuItems.map(({ label, key, links }) => (
          <li key={key}>
            <button
              onClick={() => toggleMenu(key)}
              className="flex items-center justify-between w-full px-5 py-2 rounded-md hover:bg-blue-200 transition"
            >
              {label}
              {openMenu === key ? <ChevronUp size={18} /> : <ChevronLeft size={18} />}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenu === key ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
              <ul className="ml-4 mt-2 space-y-2">
                {links.map(({ href, label, onClick }) => (
                  <li key={label}>
                    {href ? (
                      <Link href={href} className="block px-4 py-2 rounded-md hover:bg-blue-200 transition">
                        {label}
                      </Link>
                    ) : (
                      <button
                        onClick={onClick}
                        className="block w-full text-left px-4 py-2 rounded-md hover:bg-blue-200 transition"
                      >
                        {label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-4 left-4 right-4 text-sm text-black border-t border-black pt-1 md:block hidden">
        <p className="font-semibold">{`Cửa hàng: ${tenant?.name}`}</p>
        <p>{`Địa chỉ: ${tenant?.address}`}</p>
        <p>{`Điện thoại: ${tenant?.phone_number}`}</p>
      </div>
    </nav>
  );
}