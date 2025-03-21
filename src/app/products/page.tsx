"use client";
import { useCallback, useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/component/talble";
import ProtectedRoute from "@/component/ProtectedRoute";
import Cookies from "js-cookie";
import { ShoppingCart } from "lucide-react";
import CartModal from "@/component/CartModal";

interface Product {
  id: string;
  name: string;
  price: number;
  stockQuantity: number;
  importPrice: number;
  unit: string;
  discount: number;
  typeName: string;
  quantity?: number;
}

const columns: ColumnDef<Product>[] = [
  { accessorKey: "name", header: "Tên sản phẩm" },
  { accessorKey: "price_sale", header: "Giá bán", cell: (info) => `${info.getValue()} VND` },
  { accessorKey: "inventory", header: "Kho" },
  { accessorKey: "unit", header: "Đơn vị" },
];

export default function ProductsPage() {
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [flyingProduct, setFlyingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleQuantityChange = (rowId: string, value: number) => {
    setQuantities((prev) => ({ ...prev, [rowId]: value }));
  };

  const removeItem = (productId: string) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleAddToCart = (product: Product, event: any) => {
    const quantityToAdd = quantities[product.id] || 1;
    setFlyingProduct({ ...product, quantity: quantityToAdd });
    
    setTimeout(() => {
      setCart((prevCart) => {
        const updatedCart = [...prevCart];
        const existingItem = updatedCart.find((item) => item.id === product.id);
        if (existingItem) {
          existingItem.quantity = (existingItem.quantity || 1) + quantityToAdd;
        } else {
          updatedCart.push({ ...product, quantity: quantityToAdd });
        }
        return updatedCart;
      });
      setFlyingProduct(null);
    }, 1000);
  };

  const fetchProducts = useCallback(async () => {
    const token = Cookies.get("token");
    setError("");
    try {
      const response = await fetch("/api/products", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Lỗi: ${response.status}`);
      }

      const result = await response.json();
      setData(result.data || []);
    } catch (err: any) {
      setError(err.message || "Lỗi khi lấy danh sách sản phẩm");
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProtectedRoute>
      <motion.div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>
          <button onClick={() => setIsCartOpen(true)} className="flex items-center px-3 py-2 text-white bg-green-500 rounded hover:bg-green-600">
            🛒 Xem giỏ hàng ({cart.length})
          </button>
        </div>

        <DataTable
          title="Danh sách sản phẩm"
          data={data}
          columns={columns}
          onReload={fetchProducts}
          actions={(product) => (
            <div className="flex space-x-2 items-center">
              <input
                type="number"
                min={1}
                value={quantities[product.id] || 1}
                onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                className="w-16 text-center border rounded-md px-2"
              />
              <button
                onClick={(e) => handleAddToCart(product, e)}
                className="flex items-center px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Thêm vào giỏ
              </button>
            </div>
          )}
        />

        {flyingProduct && (
          <motion.div
            initial={{ opacity: 2, scale: 2, x: 0, y: 0 }}
            animate={{ opacity: 2, scale: 1, x: 700, y: -350 }}
            transition={{ duration: 0.9 }}
            className="fixed top-2/5 left-3/4 bg-white p-2 shadow-lg rounded-full"
          >
            🛍️ {flyingProduct.name}
          </motion.div>
        )}

        {isCartOpen && <CartModal cart={cart} onClose={() => setIsCartOpen(false)}  onRemoveItem={removeItem}/>}
      </motion.div>
    </ProtectedRoute>
  );
}
