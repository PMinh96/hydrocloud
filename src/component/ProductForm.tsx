"use client";
import { useState } from "react";

interface ProductFormProps {
    onClose: any, 
    // setTableData : any
}

export default function ProductForm(productFormProps : ProductFormProps) {
    const [product, setProduct] = useState({ name: "", price: "", stock: "" });

    const handleSubmit = () => {
        if (product.name) {
            // productFormProps.setTableData((prev: any) => [...prev, product]);
            productFormProps.onClose(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Thêm sản phẩm</h2>
                <input
                    type="text"
                    placeholder="Tên sản phẩm"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    className="border p-2 w-full rounded-md mb-2"
                />
                <input
                    type="number"
                    placeholder="Giá"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    className="border p-2 w-full rounded-md mb-2"
                />
                <input
                    type="number"
                    placeholder="Số lượng"
                    value={product.stock}
                    onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                    className="border p-2 w-full rounded-md mb-4"
                />
                <div className="flex justify-end space-x-2">
                    <button onClick={() => productFormProps.onClose()} className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">
                        Hủy
                    </button>
                    <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Thêm
                    </button>
                </div>
            </div>
        </div>
    );
}
