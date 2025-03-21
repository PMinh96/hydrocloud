import { X } from "lucide-react";

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

interface CartModalProps {
  cart: any[];
  onClose: () => void;
  onRemoveItem: (productId: string) => void; 
}

const CartModal = ({ cart, onClose, onRemoveItem }: CartModalProps) => {
  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg p-4 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-lg font-semibold">🛒 Giỏ hàng</h2>
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="flex-1 overflow-y-auto border rounded-lg p-2">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Chưa có sản phẩm nào.</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.price_sale} x {item.quantity} VND
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold mr-2">{item.price_sale * item.quantity} VND</p>
                  <button onClick={() => onRemoveItem(item.id)} className="p-1 hover:bg-red-100 rounded-full">
                    <X className="w-3 h-3 text-red-500 hover:text-red-700" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Tổng giá */}
      <div className="border-t pt-2 mt-4">
        <p className="text-lg font-semibold text-right">
          Tổng giá:{" "}
          {new Intl.NumberFormat("vi-VN").format(
            cart.reduce((total, item) => total + item.price_sale * item.quantity, 0)
          )}{" "}
          VND
        </p>
      </div>
    </div>
  );
};

export default CartModal;
