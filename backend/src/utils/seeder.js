const Product = require('../models/Product');

// Dữ liệu bạn gửi đã được convert sang JSON
const sampleProducts = [
    { name: 'Áo Thun Nam Basic Cotton', price: 150000, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=60', description: 'Áo thun trắng trơn basic, chất liệu 100% cotton.', stock: 100 },
    { name: 'Áo Sơ Mi Trắng Công Sở', price: 350000, image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=500&q=60', description: 'Áo sơ mi trắng form slimfit, vải chống nhăn.', stock: 80 },
    { name: 'Áo Hoodie Unisex Form Rộng', price: 420000, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=500&q=60', description: 'Áo hoodie xám chuột, chất nỉ ngoại dày dặn.', stock: 45 },
    { name: 'Quần Jean Nam Rách Gối', price: 450000, image: 'https://images.unsplash.com/photo-1542272617-08f083157f0d?auto=format&fit=crop&w=500&q=60', description: 'Quần Jean xanh nhạt, phong cách street style.', stock: 30 },
    { name: 'Quần Short Kaki Túi Hộp', price: 220000, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=500&q=60', description: 'Quần short nam màu be, nhiều túi tiện lợi.', stock: 90 },
    { name: 'Giày Sneaker Trắng Basic', price: 650000, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=60', description: 'Giày sneaker trắng tinh khôi, da PU dễ vệ sinh.', stock: 20 },
    { name: 'Giày Da Nam Oxford', price: 1200000, image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=500&q=60', description: 'Giày tây nâu, da bò thật 100%.', stock: 15 },
    { name: 'Balo Laptop Thời Trang', price: 350000, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=60', description: 'Balo xám đựng vừa laptop 15.6 inch.', stock: 50 },
    { name: 'Mũ Lưỡi Trai Đen', price: 150000, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=500&q=60', description: 'Mũ lưỡi trai đen trơn, vải kaki thoáng mát.', stock: 200 }
];

const seedData = async () => {
    try {
        const count = await Product.countDocuments();
        if (count === 0) {
            await Product.insertMany(sampleProducts);
            console.log('🌱 Data seeded successfully (Products added)');
        } else {
            console.log('ℹ️ Database already has data, skipping seed.');
        }
    } catch (error) {
        console.error('❌ Error seeding data:', error);
    }
};

module.exports = seedData;