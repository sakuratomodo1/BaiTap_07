const Product = require('../models/Product');
const CartItem = require('../models/CartItem');

const resolvers = {
    Query: {
        // Lấy danh sách sản phẩm từ DB
        products: async () => {
            return await Product.find();
        },
        // Lấy giỏ hàng
        getCart: async () => {
            return await CartItem.find();
        }
    },
    Mutation: {
        addToCart: async (_, { productId, name, price, image }) => {
            // Check xem sản phẩm đã có trong giỏ chưa
            // Ưu tiên tìm theo productId nếu có, hoặc tìm theo tên
            let existingItem;
            if (productId) {
                existingItem = await CartItem.findOne({ productId });
            } else {
                existingItem = await CartItem.findOne({ name });
            }

            if (existingItem) {
                // Nếu có rồi thì tăng số lượng
                existingItem.quantity += 1;
                return await existingItem.save();
            } else {
                // Nếu chưa có thì tạo mới
                const newItem = new CartItem({
                    productId,
                    name,
                    price,
                    image,
                    quantity: 1,
                    selected: true
                });
                return await newItem.save();
            }
        },
        updateQuantity: async (_, { id, quantity }) => {
            return await CartItem.findByIdAndUpdate(id, { quantity }, { new: true });
        },
        removeItem: async (_, { id }) => {
            await CartItem.findByIdAndDelete(id);
            return "Deleted";
        },
        checkout: async (_, { ids }) => {
            await CartItem.deleteMany({ _id: { $in: ids } });
            return "Checkout Success";
        }
    }
};

module.exports = resolvers;