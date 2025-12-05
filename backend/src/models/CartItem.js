const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    // Lưu lại thông tin cơ bản để hiển thị trong giỏ hàng nhanh chóng
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    image: String,
    quantity: { type: Number, default: 1 },
    selected: { type: Boolean, default: true },
});

module.exports = mongoose.model('CartItem', cartItemSchema);