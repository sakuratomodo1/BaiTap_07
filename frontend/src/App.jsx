// App.jsx
import React, { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Cart } from 'shopping-cart-lib-luc-thoi-trong';
import ProductList from './components/ProductList';
import { GET_CART, REMOVE_ITEM, UPDATE_QTY, CHECKOUT } from './graphql/operations';

function App() {
    // --- STATE CHO UI ---
    const [isCartOpen, setIsCartOpen] = useState(false);

    // --- QUẢN LÝ GIỎ HÀNG ---
    const { loading, error, data, refetch } = useQuery(GET_CART);
    const [removeItem] = useMutation(REMOVE_ITEM);
    const [updateQty] = useMutation(UPDATE_QTY);
    const [checkout] = useMutation(CHECKOUT);

    // --- LOGIC TÍNH TOÁN ---
    // Tính tổng số lượng item để hiện lên badge đỏ trên header
    const totalItems = useMemo(() => {
        if (!data?.getCart) return 0;
        return data.getCart.reduce((total, item) => total + (item.quantity || 1), 0);
    }, [data]);

    // --- HÀM XỬ LÝ ---
    const handleRemove = async (id) => {
        await removeItem({ variables: { id } });
        refetch();
    };

    const handleUpdateQuantity = async (id, quantity) => {
        await updateQty({ variables: { id, quantity } });
    };

    const handleCheckout = async (selectedItems) => {
        const ids = selectedItems.map(item => item.id);
        await checkout({ variables: { ids } });
        alert("Thanh toán thành công!");
        refetch();
        setIsCartOpen(false); // Đóng giỏ hàng sau khi thanh toán
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans relative">
            {/* --- HEADER --- */}
            <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-30 transition-all">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 tracking-tight">
                        🛍️ <span className="text-blue-600">Fashion</span>Store
                    </h1>

                    {/* Nút Giỏ Hàng Mới */}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-700 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>

                        {/* Badge số lượng */}
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-bounce">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </div>
            </header>

            {/* --- MAIN CONTENT (Full Width) --- */}
            <main className="max-w-7xl mx-auto p-4 sm:p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Khám phá bộ sưu tập</h2>
                    <p className="text-gray-500">Những mẫu thời trang mới nhất mùa hè này</p>
                </div>
                {/* ProductList bây giờ chiếm toàn bộ chiều rộng */}
                <ProductList />
            </main>

            {/* --- CART DRAWER / OVERLAY (Phần mới) --- */}
            {/* 1. Backdrop (Lớp nền đen mờ) */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={() => setIsCartOpen(false)}
            ></div>

            {/* 2. Drawer (Thanh trượt từ phải sang) */}
            <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Drawer Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        Giỏ hàng của bạn
                        <span className="bg-blue-100 text-blue-700 text-sm py-0.5 px-2 rounded-full">{totalItems} món</span>
                    </h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Drawer Body (Chứa component Cart) */}
                <div className="h-[calc(100vh-80px)] overflow-y-auto bg-gray-50 p-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-40 gap-3 text-gray-500">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            Đang tải dữ liệu...
                        </div>
                    ) : error ? (
                        <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
                            ⚠️ Có lỗi xảy ra khi tải giỏ hàng
                        </div>
                    ) : (
                        // Component Cart từ thư viện
                        // Lưu ý: Đảm bảo component Cart này responsive tốt trong container hẹp
                        <Cart
                            items={data.getCart || []}
                            onRemoveItem={handleRemove}
                            onUpdateQuantity={handleUpdateQuantity}
                            onCheckout={handleCheckout}
                        />
                    )}

                    {/* Empty State (Xử lý thêm nếu giỏ hàng rỗng & API trả về mảng rỗng) */}
                    {!loading && data?.getCart?.length === 0 && (
                        <div className="text-center py-10 opacity-60">
                            <span className="text-4xl block mb-2">🛒</span>
                            <p>Giỏ hàng đang trống</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="mt-4 text-blue-600 font-medium hover:underline"
                            >
                                Tiếp tục mua sắm
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;