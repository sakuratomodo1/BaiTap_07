const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Kiểu dữ liệu Sản phẩm (cho trang chủ)
  type Product {
    id: ID!
    name: String
    price: Float
    image: String
    description: String
    stock: Int
  }

  # Kiểu dữ liệu trong Giỏ hàng
  type CartItem {
    id: ID!
    productId: ID
    name: String
    price: Float
    image: String
    quantity: Int
    selected: Boolean
  }

  type Query {
    products: [Product]       # Lấy danh sách sản phẩm
    getCart: [CartItem]       # Lấy giỏ hàng
  }

  type Mutation {
    # Thêm vào giỏ (chỉ cần truyền ID sản phẩm, BE tự lo việc lấy info)
    addToCart(productId: ID!, name: String, price: Float, image: String): CartItem
    
    updateQuantity(id: ID!, quantity: Int!): CartItem
    removeItem(id: ID!): String
    checkout(ids: [ID]!): String
  }
`;

module.exports = typeDefs;