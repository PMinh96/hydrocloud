"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

interface ModalProps {
  title: string;
  type: "product" | "customer" | string;
  fields: any[];
  isOpen: boolean;
  onReload: () => void,
  onClose: () => void;
}

export default function Modal({ title, fields, isOpen, onClose, type, onReload }: ModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  useEffect(() => {
    if (isOpen) {
      const initialData: Record<string, any> = {};
      fields.forEach(({ label }) => {
        initialData[label] = "";
      });
      setFormData(initialData);
    }
  }, [isOpen, fields]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = Cookies.get("token");
      if (type === "product_add") {
        const response = await fetch("/api/products", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        console.log("Kết quả API:", result);
      }

      if (type === "customer_add") {
        console.log("call APi customer");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
    onReload();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-lg bg-black/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl w-[400px] border border-gray-300"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>

        <div className="space-y-3">
          {fields.map(({ label, type, title }) => (
            <div key={label}>
              <label className="block text-sm font-medium text-gray-700">{title}</label>
              <input
                type={type}
                name={label}
                value={formData[label] || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose} className="border-gray-400 text-gray-600">
            Đóng
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 text-white hover:bg-blue-700">
            Lưu
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
