import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS, ADD_TO_CART, GET_CART } from '../graphql/operations';

const ProductList = () => {
    const { loading, error, data } = useQuery(GET_PRODUCTS);

    // Khi thêm thành công -> Tự động load lại query GET_CART để giỏ hàng nhảy số
    const [addToCart] = useMutation(ADD_TO_CART, {
        refetchQueries: [{ query: GET_CART }]
    });

    const handleAddToCart = async (product) => {
        try {
            await addToCart({
                variables: {
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image
                }
            });
        } catch (err) {
            alert("Lỗi khi thêm vào giỏ hàng!");
            console.error(err);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    if (error) return <div className="text-red-500 text-center py-10">Lỗi kết nối Server! Hãy bật Backend lên nhé.</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.products.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">

                    {/* Phần Ảnh */}
                    <div className="relative pt-[100%] bg-gray-50 overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="absolute top-0 left-0 w-full h-full object-contain p-4 mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>

                    {/* Phần Thông tin */}
                    <div className="p-4 flex flex-col flex-1">
                        <h3 className="text-gray-800 font-bold text-lg mb-1 line-clamp-1" title={product.name}>
                            {product.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">
                            {product.description}
                        </p>

                        <div className="mt-auto flex items-center justify-between">
                            <div>
                                <span className="text-xs text-gray-400 block">Giá bán</span>
                                <span className="text-xl font-extrabold text-blue-600">
                  ${product.price.toLocaleString()}
                </span>
                            </div>

                            <button
                                onClick={() => handleAddToCart(product)}
                                className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 active:scale-95 flex items-center gap-2"
                            >
                                <span>Thêm</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;