"use client";

import Menu from "@/component/menu";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/component/talble";

interface Product {
  id: number;
  name: string;
  price: number;
  stockQuantity: number;
  importPrice: number;
  unit: string;
  discount: number;
  typeName: string;
}

const products: Product[] = [
  { id: 1, name: "Sản phẩm A", price: 20000, stockQuantity: 10, importPrice: 15000, unit: "cái", discount: 5, typeName: "Điện tử" },
  { id: 2, name: "Sản phẩm B", price: 50000, stockQuantity: 5, importPrice: 40000, unit: "cái", discount: 10, typeName: "Gia dụng" },
];

const columns: ColumnDef<Product>[] = [
  { accessorKey: "name", header: "Tên sản phẩm" },
  { accessorKey: "price", header: "Giá bán", cell: (info) => `${info.getValue()} VND` },
  { accessorKey: "stockQuantity", header: "Kho" },
  { accessorKey: "importPrice", header: "Giá nhập", cell: (info) => `${info.getValue()} VND` },
  { accessorKey: "unit", header: "Đơn vị" },
  { accessorKey: "discount", header: "Giảm giá", cell: (info) => `${info.getValue()}%` },
  { accessorKey: "typeName", header: "Loại sản phẩm" },
];

export default function ProductsPage() {
  const [data, setData] = useState<Product[]>(products);

  const handleEdit = (product: Product) => {
    alert(`Chỉnh sửa sản phẩm: ${product.name}`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      setData((prevData) => prevData.filter((product) => product.id !== id));
    }
  };

  return (
      <div className="p-4">
        <DataTable
          title="Danh sách sản phẩm"
          data={products}
          columns={columns}
          actions={(product) => (
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(product)}
                className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Sửa
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Xóa
              </button>
            </div>
          )}
        />
        
      </div>
  );
  
}
