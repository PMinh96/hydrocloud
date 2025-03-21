"use client";
import { useState } from "react";

interface CustomerFormProps {
    onClose: any, 
    // setTableData : any
}

export default function CustomerForm(customerFormProps : CustomerFormProps) {
    const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });

    const handleSubmit = () => {
        if (customer.name) {
            // customerFormProps.setTableData((prev: any) => [...prev, customer]);
            customerFormProps.onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Thêm khách hàng</h2>
                <input
                    type="text"
                    placeholder="Tên khách hàng"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="border p-2 w-full rounded-md mb-2"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="border p-2 w-full rounded-md mb-2"
                />
                <input
                    type="text"
                    placeholder="Số điện thoại"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="border p-2 w-full rounded-md mb-4"
                />
                <div className="flex justify-end space-x-2">
                    <button onClick={() => customerFormProps.onClose()} className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">
                        Hủy
                    </button>
                    <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                        Thêm
                    </button>
                </div>
            </div>
        </div>
    );
}
