"use client";
import Cookies from "js-cookie";
import Menu from "@/component/menu";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/component/talble";
import { motion } from "framer-motion";

interface Customer {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  address: string;
}

const columns: ColumnDef<Customer>[] = [
  { accessorKey: "name", header: "Tên khách hàng" },
  { accessorKey: "phone_number", header: "Số điện thoại" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "address", header: "Địa chỉ" },
];

export default function ProductsPage() {
  const [data, setData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCustomers = async () => {
    const token = Cookies.get("token");
    console.log(token)
    try {
      const response = await fetch("/api/customers", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Lỗi: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      setData(result.data || []);
    } catch (err: any) {
      console.error("Lỗi khi gọi API:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleEdit = (customer: Customer) => {
    alert(`Chỉnh sửa khách hàng: ${customer.name}`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa khách hàng này?")) {
      setData((prevData) => prevData.filter((customer) => customer.id !== id));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.07, ease: "easeOut" }}
      className="p-4"
    >
      {loading ? (
        <div className="text-center text-gray-500">Đang tải dữ liệu...</div>
      ) : (
        <DataTable
          title="Danh sách Khách Hàng"
          data={data}
          columns={columns}
          onReload={() => fetchCustomers()}
          actions={(customer) => (
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(customer)}
                className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Sửa
              </button>
              <button
                onClick={() => handleDelete(customer.id)}
                className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Xóa
              </button>
            </div>
          )}
        />
      )}
    </motion.div>
  );
}
